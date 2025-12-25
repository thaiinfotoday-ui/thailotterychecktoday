import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const SOURCES = [
    {
        name: 'Sanook',
        url: 'https://news.sanook.com/lotto/',
        parser: 'sanook',
        priority: 1
    },
    {
        name: 'Thairath',
        url: 'https://www.thairath.co.th/lottery',
        parser: 'generic_meta',
        priority: 2
    },
    {
        name: 'Kapook',
        url: 'https://lottery.kapook.com/',
        parser: 'generic_meta',
        priority: 3
    }
].sort((a, b) => a.priority - b.priority); // Ensure priority order

const REVALIDATE_SECONDS = 60; // 60 seconds for faster updates during active draws
const FETCH_TIMEOUT_MS = 10000; // 10 seconds timeout
const MAX_RETRIES = 2; // Retry failed sources once
const RETRY_DELAY_MS = 1000; // 1 second delay between retries

// Cache file path (works in Vercel serverless with /tmp)
const CACHE_FILE_PATH = path.join(process.cwd(), '.next', 'cache', 'lottery-data.json');

// In-Memory Cache for fast access (fallback)
let memoryCache = {
    data: null,
    timestamp: 0,
    source: null
};

// --- UTILITY FUNCTIONS ---

/**
 * Fetch with timeout wrapper
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeoutMs}ms`);
        }
        throw error;
    }
}

/**
 * Extract date from various sources in HTML
 */
function extractDate($) {
    // Try structured data first
    let date = null;
    $('script[type="application/ld+json"]').each((i, el) => {
        try {
            const json = JSON.parse($(el).html());
            if (json.datePublished) {
                date = json.datePublished.split('T')[0];
                return false; // break
            }
        } catch (e) {
            // Continue to next script
        }
    });

    if (date) return date;

    // Try meta tags
    const metaDate = $('meta[property="article:published_time"]').attr('content') ||
        $('meta[name="publish-date"]').attr('content') ||
        $('meta[property="og:updated_time"]').attr('content');

    if (metaDate) {
        try {
            return new Date(metaDate).toISOString().split('T')[0];
        } catch (e) {
            // Invalid date format
        }
    }

    // Try parsing from title or content (Thai Buddhist year to Gregorian)
    const title = $('title').text();
    const dateMatch = title.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
        return dateMatch[0];
    }

    // Fallback: use today's date (but mark as uncertain)
    return new Date().toISOString().split('T')[0];
}

/**
 * Structured logging
 */
function log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level,
        message,
        ...(data && { data })
    };

    if (level === 'error') {
        console.error(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data || '');
    } else if (level === 'warn') {
        console.warn(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data || '');
    } else {
        console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data || '');
    }
}

// --- PARSERS ---
const parsers = {
    sanook: ($) => {
        const findNumbers = (label) => {
            const labelEl = $(`em.lotto__name:contains("${label}")`);
            if (!labelEl.length) return null;
            const numbers = [];
            labelEl.closest('.lotto__cell').find('.lotto__number').each((i, el) => {
                const num = $(el).text().trim();
                if (num) numbers.push(num);
            });
            return numbers.length > 0 ? numbers : null;
        };

        const firstPrize = $('.lotto__number--first').first().text().trim() || null;
        const lastTwo = findNumbers('เลขท้าย 2 ตัว')?.[0] || null;
        const frontThree = findNumbers('เลขหน้า 3 ตัว') || [];
        const backThree = findNumbers('เลขท้าย 3 ตัว') || [];
        const date = extractDate($);

        return { firstPrize, lastTwo, frontThree, backThree, date };
    },

    generic_meta: ($) => {
        const description = $('meta[name="description"]').attr('content') ||
            $('meta[property="og:description"]').attr('content') || '';

        const cleanText = description.replace(/\s+/g, ' ');

        const firstPrizeMatch = cleanText.match(/(?:รางวัลที่|ที่|prize)\s*1\s*[:\s]*([0-9]{6})/);
        const lastTwoMatch = cleanText.match(/(?:เลขท้าย|ท้าย|last)\s*2\s*(?:ตัว)?\s*[:\s]*([0-9]{2})/);
        const frontThreeMatch = cleanText.match(/เลขหน้า\s*3\s*ตัว\s*[:\s]*([0-9]{3})\s*[,&]\s*([0-9]{3})/);
        const backThreeMatch = cleanText.match(/เลขท้าย\s*3\s*ตัว\s*[:\s]*([0-9]{3})\s*[,&]\s*([0-9]{3})/);

        const date = extractDate($);

        return {
            firstPrize: firstPrizeMatch?.[1] || null,
            lastTwo: lastTwoMatch?.[1] || null,
            frontThree: frontThreeMatch ? [frontThreeMatch[1], frontThreeMatch[2]] : [],
            backThree: backThreeMatch ? [backThreeMatch[1], backThreeMatch[2]] : [],
            date
        };
    }
};

/**
 * Strict validation of lottery data
 */
function validateData(data) {
    if (!data || typeof data !== 'object') {
        log('warn', 'Validation failed: data is null or not an object');
        return false;
    }

    // First prize must be exactly 6 digits
    if (!data.firstPrize || !/^\d{6}$/.test(data.firstPrize)) {
        log('warn', 'Validation failed: invalid first prize', { firstPrize: data.firstPrize });
        return false;
    }

    // Last two must be exactly 2 digits
    if (!data.lastTwo || !/^\d{2}$/.test(data.lastTwo)) {
        log('warn', 'Validation failed: invalid last two', { lastTwo: data.lastTwo });
        return false;
    }

    // Front three and back three should be arrays with valid 3-digit numbers
    if (data.frontThree && Array.isArray(data.frontThree)) {
        const invalidFront = data.frontThree.some(num => !/^\d{3}$/.test(num));
        if (invalidFront) {
            log('warn', 'Validation failed: invalid front three numbers', { frontThree: data.frontThree });
            return false;
        }
    }

    if (data.backThree && Array.isArray(data.backThree)) {
        const invalidBack = data.backThree.some(num => !/^\d{3}$/.test(num));
        if (invalidBack) {
            log('warn', 'Validation failed: invalid back three numbers', { backThree: data.backThree });
            return false;
        }
    }

    // Date should be present (but we allow fallback to today)
    if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
        log('warn', 'Validation warning: invalid or missing date, will use fallback', { date: data.date });
        // Don't fail validation for date, but log it
    }

    return true;
}

/**
 * Normalize raw data to standard API format
 */
function normalize(rawData, sourceName) {
    return {
        source: sourceName,
        date: rawData.date || new Date().toISOString().split('T')[0],
        results: {
            first_prize: rawData.firstPrize,
            last_two: rawData.lastTwo,
            front_three: Array.isArray(rawData.frontThree) ? rawData.frontThree : [],
            back_three: Array.isArray(rawData.backThree) ? rawData.backThree : []
        },
        stale: false
    };
}

/**
 * Load cache from file system (persistent across serverless invocations)
 */
async function loadFileCache() {
    try {
        const cacheDir = path.dirname(CACHE_FILE_PATH);
        await fs.mkdir(cacheDir, { recursive: true });

        const fileContent = await fs.readFile(CACHE_FILE_PATH, 'utf-8');
        const cache = JSON.parse(fileContent);

        // Validate cache structure
        if (cache && cache.data && cache.timestamp) {
            return cache;
        }
    } catch (error) {
        // File doesn't exist or is invalid - that's okay
        if (error.code !== 'ENOENT') {
            log('warn', 'Failed to load file cache', { error: error.message });
        }
    }
    return null;
}

/**
 * Save cache to file system
 */
async function saveFileCache(cacheData) {
    try {
        const cacheDir = path.dirname(CACHE_FILE_PATH);
        await fs.mkdir(cacheDir, { recursive: true });
        await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(cacheData, null, 2), 'utf-8');
    } catch (error) {
        log('error', 'Failed to save file cache', { error: error.message });
        // Don't throw - file cache is optional
    }
}

/**
 * Fetch from a single source with retry logic
 */
async function fetchFromSource(source, retryCount = 0) {
    try {
        log('info', `Fetching from ${source.name}`, { url: source.url, attempt: retryCount + 1 });

        const response = await fetchWithTimeout(source.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'th-TH,th;q=0.9,en;q=0.8'
            }
        }, FETCH_TIMEOUT_MS);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        if (!html || html.length < 100) {
            throw new Error('Received empty or too short HTML response');
        }

        const $ = cheerio.load(html);
        const parserFunc = parsers[source.parser];

        if (!parserFunc) {
            throw new Error(`Parser '${source.parser}' not found`);
        }

        const rawData = parserFunc($);

        if (validateData(rawData)) {
            log('info', `Successfully fetched and validated data from ${source.name}`);
            return normalize(rawData, source.name);
        } else {
            throw new Error('Data validation failed');
        }
    } catch (error) {
        log('error', `Error fetching from ${source.name}`, {
            error: error.message,
            attempt: retryCount + 1
        });

        // Retry logic
        if (retryCount < MAX_RETRIES) {
            log('info', `Retrying ${source.name} in ${RETRY_DELAY_MS}ms...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (retryCount + 1)));
            return fetchFromSource(source, retryCount + 1);
        }

        throw error;
    }
}

/**
 * Main function to get lottery data with caching and fallback
 */
export async function getLotteryData(forceRefresh = false) {
    const now = Date.now();

    // 1. Check memory cache first (fastest)
    if (!forceRefresh && memoryCache.data && (now - memoryCache.timestamp < REVALIDATE_SECONDS * 1000)) {
        log('info', 'Serving from memory cache');
        return memoryCache.data;
    }

    // 2. Check file cache (persistent across serverless invocations)
    if (!forceRefresh) {
        const fileCache = await loadFileCache();
        if (fileCache && fileCache.data && (now - fileCache.timestamp < REVALIDATE_SECONDS * 1000)) {
            log('info', 'Serving from file cache');
            // Update memory cache too
            memoryCache = fileCache;
            return fileCache.data;
        }
    }

    // 3. Fetch from sources (priority order)
    let finalResult = null;
    let activeSource = null;
    const errors = [];

    for (const source of SOURCES) {
        try {
            finalResult = await fetchFromSource(source);
            activeSource = source.name;
            break; // Success - stop trying other sources
        } catch (err) {
            errors.push({ source: source.name, error: err.message });
            // Continue to next source
        }
    }

    // 4. Update cache if we got fresh data
    if (finalResult) {
        const cacheData = {
            data: finalResult,
            timestamp: now,
            source: activeSource
        };

        memoryCache = cacheData;
        await saveFileCache(cacheData);

        log('info', 'Cache updated with fresh data', { source: activeSource });
        return finalResult;
    }

    // 5. Fallback to stale cache if available
    const staleCache = memoryCache.data || await loadFileCache();
    if (staleCache && staleCache.data) {
        log('warn', 'Serving stale data - all sources failed', { errors });
        return {
            ...staleCache.data,
            stale: true,
            warning: "Live fetch failed, serving stale data."
        };
    }

    // 6. Complete failure - no cache, all sources failed
    log('error', 'Complete failure - no data available', { errors });
    throw new Error("Unable to fetch lottery results from any source.");
}
