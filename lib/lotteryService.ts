import * as cheerio from 'cheerio';
import { createServerClient } from './supabase';

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
].sort((a, b) => a.priority - b.priority);

const FETCH_TIMEOUT_MS = 10000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

// --- UTILITY FUNCTIONS ---

// Rate-limited logging to reduce noise
let lastWarnLogTime = 0;
const WARN_LOG_INTERVAL = 600000; // Log same warning max once per 10 minutes (expected behavior)

function log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    
    // Rate limit WARN logs for expected fallback scenarios
    if (level === 'warn' && message.includes('Live sources unavailable')) {
        const now = Date.now();
        if (now - lastWarnLogTime < WARN_LOG_INTERVAL) {
            // Skip logging if same warning was logged recently
            return;
        }
        lastWarnLogTime = now;
    }
    
    // Only log important messages in production
    if (process.env.NODE_ENV === 'production' && level === 'info' && message.includes('Fetching from')) {
        // Skip verbose info logs in production
        return;
    }
    
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data ? JSON.stringify(data) : '');
}

async function fetchWithTimeout(url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// --- PARSERS (Same as before) ---
function extractDate($) {
    let date = null;
    $('script[type="application/ld+json"]').each((i, el) => {
        try {
            const json = JSON.parse($(el).html());
            if (json.datePublished) {
                date = json.datePublished.split('T')[0];
                return false;
            }
        } catch (e) { }
    });
    if (date) return date;

    const metaDate = $('meta[property="article:published_time"]').attr('content') ||
        $('meta[name="publish-date"]').attr('content') ||
        $('meta[property="og:updated_time"]').attr('content');

    if (metaDate) {
        try { return new Date(metaDate).toISOString().split('T')[0]; } catch (e) { }
    }

    const title = $('title').text();
    const dateMatch = title.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) return dateMatch[0];

    return new Date().toISOString().split('T')[0];
}

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
        return {
            firstPrize: $('.lotto__number--first').first().text().trim() || null,
            lastTwo: findNumbers('เลขท้าย 2 ตัว')?.[0] || null,
            frontThree: findNumbers('เลขหน้า 3 ตัว') || [],
            backThree: findNumbers('เลขท้าย 3 ตัว') || [],
            date: extractDate($)
        };
    },
    generic_meta: ($) => {
        const description = $('meta[name="description"]').attr('content') ||
            $('meta[property="og:description"]').attr('content') || '';
        const cleanText = description.replace(/\s+/g, ' ');

        const firstPrizeMatch = cleanText.match(/(?:รางวัลที่|ที่|prize)\s*1\s*[:\s]*([0-9]{6})/);
        const lastTwoMatch = cleanText.match(/(?:เลขท้าย|ท้าย|last)\s*2\s*(?:ตัว)?\s*[:\s]*([0-9]{2})/);
        const frontThreeMatch = cleanText.match(/เลขหน้า\s*3\s*ตัว\s*[:\s]*([0-9]{3})\s*[,&]\s*([0-9]{3})/);
        const backThreeMatch = cleanText.match(/เลขท้าย\s*3\s*ตัว\s*[:\s]*([0-9]{3})\s*[,&]\s*([0-9]{3})/);

        return {
            firstPrize: firstPrizeMatch?.[1] || null,
            lastTwo: lastTwoMatch?.[1] || null,
            frontThree: frontThreeMatch ? [frontThreeMatch[1], frontThreeMatch[2]] : [],
            backThree: backThreeMatch ? [backThreeMatch[1], backThreeMatch[2]] : [],
            date: extractDate($)
        };
    }
};

function normalize(rawData, sourceName) {
    return {
        source: sourceName,
        date: rawData.date || new Date().toISOString().split('T')[0],
        results: {
            first_prize: rawData.firstPrize,
            last_two: rawData.lastTwo,
            front_three: Array.isArray(rawData.frontThree) ? rawData.frontThree : [],
            back_three: Array.isArray(rawData.backThree) ? rawData.backThree : []
        }
    };
}

async function fetchFromSource(source, retryCount = 0) {
    try {
        log('info', `Fetching from ${source.name}`, { url: source.url });
        const response = await fetchWithTimeout(source.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9,th;q=0.8',
                'Referer': 'https://www.google.com/',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        const $ = cheerio.load(html);
        const parserFunc = parsers[source.parser];

        const rawData = parserFunc($);

        // Basic validation
        if (!rawData.firstPrize || !rawData.lastTwo) {
            // Only log parsing failures in development, not during build/production
            if (process.env.NODE_ENV === 'development') {
                console.warn(`[${source.name}] Parsing failed or incomplete:`, JSON.stringify(rawData));
            }
            throw new Error('Incomplete data');
        }

        return normalize(rawData, source.name);

    } catch (error) {
        if (retryCount < MAX_RETRIES) {
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
            return fetchFromSource(source, retryCount + 1);
        }
        throw error;
    }
}

// --- DB FUNCTIONS ---

async function getLatestFromDB() {
    try {
        const supabase = createServerClient();
        const { data, error } = await supabase
            .from('lottery_results')
            .select('*')
            .order('date', { ascending: false })
            .limit(1);

        if (error) {
            log('warn', 'DB Fetch Error', error.message);
            return null;
        }

        if (!data || data.length === 0) {
            return null;
        }

        return data[0];
    } catch (e) {
        log('error', 'Supabase Client Error', e.message);
        return null;
    }
}

async function saveToDB(normalizedData) {
    try {
        const supabase = createServerClient();
        // UPSERT based on 'date'
        const { error } = await supabase
            .from('lottery_results')
            .upsert({
                date: normalizedData.date,
                results: normalizedData.results,
                source: normalizedData.source,
                updated_at: new Date().toISOString()
            }, { onConflict: 'date' });

        if (error) throw error;
        log('info', 'Saved to DB', normalizedData.date);
    } catch (e) {
        log('error', 'Failed to save to DB', e.message);
    }
}

/**
 * Main Logic
 * forceRefresh = true (Called by CRON): Fetch external -> Save DB -> Return
 * forceRefresh = false (Called by USER): Fetch DB -> Return. (Fallback to external only on empty DB)
 */
// Import static fallback
import { STATIC_FALLBACK_DATA } from './staticResult';

/**
 * Main Logic: Fail-Safe Data Fetching
 * 1. Try DB/Cache (Fast)
 * 2. Try Scrapers (Slow)
 * 3. FALLBACK to Static Data (Instant)
 * 
 * GUARANTEE: Never throws an error. Always returns valid data.
 */
export async function getLotteryData(forceRefresh = false) {
    const COMPONENT_TIMEOUT = 5000; // Max time before giving up on live data

    try {
        // Enforce a hard timeout on the entire operation
        const fetchPromise = (async () => {
            // 1. If NOT forced (normal user), try DB first
            if (!forceRefresh) {
                try {
                    const dbPromise = getLatestFromDB();
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('DB Timeout')), 1500)
                    );
                    const dbData = await Promise.race([dbPromise, timeoutPromise]) as any;

                    if (dbData) {
                        return {
                            results: dbData.results,
                            date: dbData.date,
                            source: dbData.source
                        };
                    }
                } catch (dbError) {
                    log('warn', 'DB Fetch rejected, proceeding to live source.');
                }
            }

            // 2. Fetch from External Sources (CRON or Fallback)
            // Parallel fetch to beat the clock
            try {
                const data = await Promise.any(
                    SOURCES.map(source =>
                        fetchFromSource(source).then(async d => {
                            // Fire and forget save (don't block return)
                            saveToDB(d).catch(e => console.error("BG Save Error:", e));
                            return d;
                        })
                    )
                );

                return {
                    results: data.results,
                    date: data.date,
                    source: data.source
                };
            } catch (aggregateError) {
                // All sources failed
                throw new Error("All live sources failed");
            }
        })();

        // Hard Timeout Race
        const hardTimeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Global Timeout')), COMPONENT_TIMEOUT)
        );

        return await Promise.race([fetchPromise, hardTimeout]) as any;

    } catch (criticalError) {
        // Only log if it's not a normal fallback scenario
        if (!criticalError.message.includes('All live sources failed') && !criticalError.message.includes('Global Timeout')) {
            log('error', `Data Fetch Failed: ${criticalError.message}. Serving STATIC FALLBACK.`);
        } else {
            // This is expected - sources unavailable, using fallback (log once per minute max)
            log('warn', `Live sources unavailable, serving cached/static data. This is normal.`);
        }
        // 3. ULTIMATE FALLBACK - Always return valid data
        return STATIC_FALLBACK_DATA;
    }
}

// Import history data to check against static archives
import { staticHistoryData } from './historyData';

/**
 * Safe method to get a specific draw by date.
 * Checks:
 * 1. Latest Live Data (DB/Cache)
 * 2. Static History Archive
 * 3. Fallback (if critical)
 */
export async function getDrawByDate(date: string) {
    // 1. Check if it's the latest draw
    try {
        const latest = await getLotteryData(); // This is fast & fail-safe now
        if (latest.date === date) {
            return {
                date: latest.date,
                first: latest.results.first_prize,
                last2: latest.results.last_two,
                front3: latest.results.front_three,
                back3: latest.results.back_three
            };
        }
    } catch (e) { /* ignore */ }

    // 2. Check Static History
    const historical = staticHistoryData.find(d => d.date === date);
    if (historical) return historical;

    // 3. Last Resort: Return null (Page will show "Result Pending" or 404 handled gracefully)
    return null;
}
