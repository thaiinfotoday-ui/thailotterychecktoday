import { getLotteryData } from './lotteryService';

// Real historical data verified from official sources (2025)
export const staticHistoryData = [
    { date: "2025-12-16", first: "763895", last2: "52", front3: ["431", "176"], back3: ["014", "449"] },
    { date: "2025-12-01", first: "461252", last2: "22", front3: ["655", "389"], back3: ["137", "995"] },
    { date: "2025-11-16", first: "458145", last2: "37", front3: ["242", "602"], back3: ["239", "389"] },
    { date: "2025-11-01", first: "345898", last2: "87", front3: ["449", "328"], back3: ["111", "690"] },
    { date: "2025-10-16", first: "059696", last2: "61", front3: ["531", "955"], back3: ["476", "889"] },
    { date: "2025-10-01", first: "876978", last2: "77", front3: ["843", "532"], back3: ["280", "605"] },
];

export async function getHistoryData(year = null, page = 1, skipLiveFetch = false) {
    // 1. Start with static data
    let data = [...staticHistoryData];

    // 2. Try to fetch the absolutely latest LIVE data (skip for homepage performance)
    if (!skipLiveFetch) {
        try {
            // Add timeout to prevent slow loading
            const liveDataPromise = getLotteryData();
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 1500)
            );

            const liveData = await Promise.race([liveDataPromise, timeoutPromise]);

            // If live data exists and valid
            if (liveData && liveData.date && liveData.results && liveData.results.first_prize !== 'xxxxxx') {
                const exists = data.find(d => d.date === liveData.date);

                // If this date is NOT in our static list yet, ADD IT automatically
                if (!exists) {
                    const newEntry = {
                        date: liveData.date,
                        first: liveData.results.first_prize,
                        last2: liveData.results.last_two,
                        front3: liveData.results.front_three,
                        back3: liveData.results.back_three
                    };
                    // Prepend to start of array
                    data.unshift(newEntry);
                }
            }
        } catch (e) {
            // Silently fail - use static data only
            // console.error("Failed to merge live data into history:", e);
        }
    }

    if (year) {
        data = data.filter(item => item.date.startsWith(year));
    }

    const pageSize = 10;
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
        results: data.slice(start, end),
        pagination: {
            current: page,
            total: totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    };
}
