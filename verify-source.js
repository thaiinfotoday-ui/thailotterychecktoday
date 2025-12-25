const cheerio = require('cheerio');
const fs = require('fs');

async function fetchSource() {
    try {
        const response = await fetch('https://www.myanthai.com/results', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
            }
        });

        const html = await response.text();
        console.log("Status:", response.status);
        console.log("HTML length:", html.length);

        const $ = cheerio.load(html);
        const title = $('title').text();
        console.log("Page Title:", title);

        // Try to dump some relevant selectors to deduce structure
        // Usually lottery results are in tables or divs with specific classes
        // Let's look for common patterns or text

        // Find date
        console.log("Sample Text:", $('body').text().substring(0, 500).replace(/\s+/g, ' '));

        // Dump potential containers
        $('.result-card, .card, .lottery, table').each((i, el) => {
            console.log(`Container ${i}:`, $(el).attr('class'));
            console.log("Text:", $(el).text().substring(0, 100).replace(/\s+/g, ' '));
        });

    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

fetchSource();
