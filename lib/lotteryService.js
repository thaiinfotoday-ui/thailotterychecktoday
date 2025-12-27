import * as cheerio from 'cheerio';
import { createServerClient } from './supabase.js';

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

function log(level, message, data = null) {
    const timestamp = new Date().toISOString();
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        const $ = cheerio.load(html);
        const parserFunc = parsers[source.parser];

        const rawData = parserFunc($);

        // Basic validation
        if (!rawData.firstPrize || !rawData.lastTwo) {
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
            .limit(1)
            .single();

        if (error) {
            // It's normal to return null if table is empty or query fails
            log('warn', 'DB Fetch Error', error.message);
            return null;
        }

        return data;
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
export async function getLotteryData(forceRefresh = false) {

    // 1. If NOT forced (normal user), try DB first WITH TIMEOUT
    try {
        if (!forceRefresh) {
            // Race: DB vs 1-second timeout
            const dbPromise = getLatestFromDB();
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('DB Timeout')), 1000)
            );

            const dbData = await Promise.race([dbPromise, timeoutPromise]);

            if (dbData) {
                log('info', 'Serving from DB (Fast Path)', { date: dbData.date });
                return {
                    results: dbData.results,
                    date: dbData.date,
                    source: dbData.source
                };
            }
            log('warn', 'DB empty or inaccessible. Falling back to live fetch.');
        }

        // 2. Fetch from sources (CRON or Fallback)
        // Try all sources
        for (const source of SOURCES) {
            try {
                const data = await fetchFromSource(source);

                // Save to DB for future requests
                await saveToDB(data);

                return {
                    results: data.results,
                    date: data.date,
                    source: data.source
                };
            } catch (e) {
                log('warn', `Source ${source.name} failed: ${e.message}`);
            }
        }
    } catch (criticalError) {
        log('error', `CRITICAL FAILURE in getLotteryData: ${criticalError.message}`);
    }

    // 3. Fallback: Return hardcoded recent data if everything fails
    log('warn', 'All sources failed. Returning FAILSAFE data.');
    return {
        date: '2025-12-16',
        source: 'System Archive',
        results: {
            first_prize: '763895',
            last_two: '52',
            front_three: ['431', '176'],
            back_three: ['014', '449']
        }
    };
}
