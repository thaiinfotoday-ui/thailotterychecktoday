import { getLotteryData } from '@/lib/lotteryService';
import { getHistoryData } from '@/lib/historyData';
import { getAllPosts } from '@/lib/blogService';
import HomeClient from './components/HomeClient';

// ISR: Regenerate page every 60 seconds in background
export const revalidate = 60;

// Instant Fallback Data (guaranteed fast load)
const INSTANT_FALLBACK = {
  date: '2025-12-16',
  source: 'Cache',
  results: {
    first_prize: '763895',
    last_two: '52',
    front_three: ['431', '176'],
    back_three: ['014', '449']
  }
};

// Server Component with timeout protection and parallel fetching
export default async function Home() {
  let initialData = INSTANT_FALLBACK; // Start with instant data
  let historyData = null;
  let latestPosts = [];

  try {
    // Fetch all data in PARALLEL with individual timeouts
    const [lotteryResult, historyResult, postsResult] = await Promise.allSettled([
      // Lottery data with 2 second timeout
      Promise.race([
        getLotteryData(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 2000)
        )
      ]),
      // History data with 1 second timeout (skip live fetch for homepage)
      Promise.race([
        getHistoryDataStatic(), // Use static version for homepage
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 1000)
        )
      ]),
      // Blog posts with 2 second timeout
      Promise.race([
        getAllPosts(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 2000)
        )
      ])
    ]);

    // Process results
    if (lotteryResult.status === 'fulfilled') {
      initialData = lotteryResult.value;
    }

    if (historyResult.status === 'fulfilled') {
      historyData = historyResult.value.results.slice(0, 5);
    } else {
      // Fallback to static data
      historyData = [
        { date: "2025-12-16", first: "763895", last2: "52", front3: ["431", "176"], back3: ["014", "449"] },
        { date: "2025-12-01", first: "461252", last2: "22", front3: ["655", "389"], back3: ["137", "995"] },
        { date: "2025-11-16", first: "458145", last2: "37", front3: ["242", "602"], back3: ["239", "389"] },
        { date: "2025-11-01", first: "345898", last2: "87", front3: ["449", "328"], back3: ["111", "690"] },
        { date: "2025-10-16", first: "059696", last2: "61", front3: ["531", "955"], back3: ["476", "889"] },
      ];
    }

    if (postsResult.status === 'fulfilled') {
      latestPosts = postsResult.value
        .filter(p => p.status === 'published')
        .slice(0, 4);
    }

  } catch (e) {
    console.error("Error loading page data:", e.message);
    // Use fallbacks already set
  }

  return <HomeClient initialData={initialData} history={historyData} latestPosts={latestPosts} />;
}

// Fast static history for homepage (no live fetch)
async function getHistoryDataStatic() {
  const staticData = [
    { date: "2025-12-16", first: "763895", last2: "52", front3: ["431", "176"], back3: ["014", "449"] },
    { date: "2025-12-01", first: "461252", last2: "22", front3: ["655", "389"], back3: ["137", "995"] },
    { date: "2025-11-16", first: "458145", last2: "37", front3: ["242", "602"], back3: ["239", "389"] },
    { date: "2025-11-01", first: "345898", last2: "87", front3: ["449", "328"], back3: ["111", "690"] },
    { date: "2025-10-16", first: "059696", last2: "61", front3: ["531", "955"], back3: ["476", "889"] },
    { date: "2025-10-01", first: "876978", last2: "77", front3: ["843", "532"], back3: ["280", "605"] },
  ];
  return { results: staticData };
}
