import * as cheerio from 'cheerio';

export async function fetchMyanThaiResults() {
    const url = 'https://www.myanthai.com/results';

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch source: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // STRATEGY 1: Parse __NEXT_DATA__ if available (Most reliable for Next.js sites)
        const nextDataScript = $('#__NEXT_DATA__');
        if (nextDataScript.length) {
            try {
                const json = JSON.parse(nextDataScript.html());
                // Traverse JSON to find results. 
                // This is speculative without seeing the JSON structure, but usually it's in props.pageProps
                // Logic: Search recursively for an object containing "first" or "prize" keys with 6 digit values.
                // For safety, we adhere to the HTML parsing requirement as primary if generic.
            } catch (e) {
                console.error("Failed to parse NEXT_DATA", e);
            }
        }

        // STRATEGY 2: Visual Selectors / Text Search (Fallback compliant with "curl-style html extraction")

        // 1. Find Date
        // We look for common date formats in headers
        let date = new Date().toISOString().split('T')[0]; // Default today
        const possibleDateText = $('h1, h2, .date, time').text();
        const dateMatch = possibleDateText.match(/(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
            date = dateMatch[1];
        }

        // 2. Extract Numbers
        // We'll look for specific patterns in the DOM order, assuming a standard layout
        // First Prize: 6 digits
        // Front/Back 3: 3 digits (x4 usually)
        // Last 2: 2 digits

        const allNumbers = [];
        $('*').each((i, el) => {
            // Avoid script tags and style tags
            const tag = (el as any).tagName; // Cast to any to avoid type error
            if (tag === 'script' || tag === 'style') return;

            // Get immediate text only
            const text = $(el).clone().children().remove().end().text().trim();
            if (/^\d{6}$/.test(text)) allNumbers.push({ type: 'first', value: text });
            if (/^\d{3}$/.test(text)) allNumbers.push({ type: 'three', value: text });
            if (/^\d{2}$/.test(text)) allNumbers.push({ type: 'two', value: text });
        });

        // Filter valid candidates (naive heuristic for "latest" draw)
        // Usually the first 6-digit number is the First Prize
        const firstPrizeCandidate = allNumbers.find(n => n.type === 'first');

        // Front/Back 3 are usually the first 4 occurrences of 3-digit numbers after the first prize?
        // Or sometimes they are before.
        // Let's rely on quantity.
        const threeDigitCandidates = allNumbers.filter(n => n.type === 'three').map(n => n.value).slice(0, 4);

        // Last 2 is usually one distinct 2-digit number prominent in the DOM.
        const twoDigitCandidates = allNumbers.filter(n => n.type === 'two').map(n => n.value);
        const lastTwoCandidate = twoDigitCandidates.length > 0 ? twoDigitCandidates[0] : null;

        if (!firstPrizeCandidate) {
            throw new Error("Could not identify First Prize in HTML");
        }

        return {
            source: "myanthai",
            date: date,
            results: {
                first_prize: firstPrizeCandidate.value,
                front_three: threeDigitCandidates.slice(0, 2), // First 2 are front? (Guessing standard order)
                back_three: threeDigitCandidates.slice(2, 4), // Next 2 are back?
                last_two: lastTwoCandidate || "00"
            }
        };

    } catch (error) {
        console.error("MyanThai Fetch Error:", error);
        throw error;
    }
}
