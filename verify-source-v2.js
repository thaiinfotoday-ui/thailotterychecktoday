const cheerio = require('cheerio');

async function fetchSource() {
    try {
        const response = await fetch('https://www.myanthai.com/results', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9,th;q=0.8',
                'Referer': 'https://www.google.com/'
            }
        });

        const html = await response.text();
        const $ = cheerio.load(html);

        console.log("Searching for 6-digit numbers...");

        // Find elements containing exactly 6 digits
        $('*').each((i, el) => {
            const text = $(el).text().trim();
            if (/^\d{6}$/.test(text)) {
                const parent = $(el).parent();
                console.log(`Found 6-digit: ${text}`);
                console.log(`Tag: <${el.tagName}> Class: "${$(el).attr('class')}" ID: "${$(el).attr('id')}"`);
                console.log(`Parent Tag: <${parent[0].tagName}> Parent Class: "${parent.attr('class')}"`);
                console.log("--------------------------------");
                return false; // Stop after first match (latest draw mostly)
            }
        });

        console.log("\nSearching for Date...");
        // Look for date patterns YYYY-MM-DD or DD Month YYYY
        $('*').each((i, el) => {
            const text = $(el).text().trim();
            if (/\d{1,2}\s+[A-Za-z]+\s+\d{4}/.test(text) || /\d{4}-\d{2}-\d{2}/.test(text)) {
                // Check if it looks close to a result header
                if ($(el).parents().length < 10) { // Top level mostly
                    console.log(`Date Match: ${text}`);
                    console.log(`Tag: <${el.tagName}> Class: "${$(el).attr('class')}"`);
                    return false;
                }
            }
        });

    } catch (e) {
        console.error(e);
    }
}

fetchSource();
