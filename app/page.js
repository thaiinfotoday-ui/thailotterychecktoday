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

// Server Component with timeout protection
export default async function Home() {
  let initialData = INSTANT_FALLBACK; // Start with instant data
  let historyData = null;
  let latestPosts = [];

  try {
    // Race condition: Max 3 seconds for data fetch
    const dataPromise = Promise.race([
      getLotteryData(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 3000)
      )
    ]);

    initialData = await dataPromise;

    const historyRes = await getHistoryData();
    historyData = historyRes.results.slice(0, 5);

    const allPosts = await getAllPosts();
    latestPosts = allPosts
      .filter(p => p.status === 'published')
      .slice(0, 4);

  } catch (e) {
    console.error("Using fallback data:", e.message);
    // initialData already set to INSTANT_FALLBACK
  }

  return <HomeClient initialData={initialData} history={historyData} latestPosts={latestPosts} />;
}
