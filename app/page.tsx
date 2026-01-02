import { getLotteryData } from '@/lib/lotteryService';
import { getAllPosts } from '@/lib/blogService';
import HomeClient from './components/HomeClient';
import { STATIC_FALLBACK_DATA } from '@/lib/staticResult';

// ISR: Regenerate page every 1 hour (Safe for twice-a-month updates)
export const revalidate = 3600;

// Define types
interface LotteryData {
  date: string;
  source: string;
  results: {
    first_prize: string;
    last_two: string;
    front_three: string[];
    back_three: string[];
  };
}

export async function generateMetadata() {
  // Fetch the actual lottery data to ensure title matches the displayed results
  let dateString = '';

  try {
    const data = await getLotteryData();
    if (data && data.date) {
      // Assuming data.date is in YYYY-MM-DD format (e.g., "2025-12-16")
      const [year, month, day] = data.date.split('-');
      dateString = `${day}-${month}-${year}`; // Convert to DD-MM-YYYY
    }
  } catch (error) {
    console.error('Metadata lottery fetch failed:', error);
  }

  // Fallback to today's date if fetch fails
  if (!dateString) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    dateString = `${day}-${month}-${year}`;
  }

  return {
    title: `Thailand Lottery Result ${dateString} Win Thai Lottery Today`,
    description: `Check latest Thailand Lottery Result for ${dateString}. Win Thai Lottery Today with live updates and accurate results.`,
  };
}

// Server Component: Static First Architecture
export default async function Home() {
  // Parallel Data Fetching
  const [lotteryResult, historyResult, postsResult] = await Promise.allSettled([
    getLotteryData(),        // Now Guaranteed to return data (Fail-Safe)
    getHistoryDataStatic(),  // Local Static
    getAllPosts()            // Can fail (optional)
  ]);

  // 1. Lottery Data (Guaranteed valid)
  const initialData: LotteryData = lotteryResult.status === 'fulfilled'
    ? (lotteryResult.value as LotteryData)
    : STATIC_FALLBACK_DATA;

  // 2. History Data
  let historyData = [];
  if (historyResult.status === 'fulfilled') {
    historyData = (historyResult.value as any).results.slice(0, 5);
  } else {
    // Emergency Static History
    historyData = getStaticHistoryFallback();
  }

  // 3. Blog Posts
  let latestPosts = [];
  if (postsResult.status === 'fulfilled') {
    latestPosts = (postsResult.value as any[])
      .filter(p => p.status === 'published')
      .slice(0, 4);
  }

  return <HomeClient initialData={initialData} history={historyData} latestPosts={latestPosts} />;
}

// Fast static history for homepage (no live fetch)
async function getHistoryDataStatic() {
  return { results: getStaticHistoryFallback() };
}

function getStaticHistoryFallback() {
  return [
    { date: "2025-12-16", first: "763895", last2: "52", front3: ["431", "176"], back3: ["014", "449"] },
    { date: "2025-12-01", first: "461252", last2: "22", front3: ["655", "389"], back3: ["137", "995"] },
    { date: "2025-11-16", first: "458145", last2: "37", front3: ["242", "602"], back3: ["239", "389"] },
    { date: "2025-11-01", first: "345898", last2: "87", front3: ["449", "328"], back3: ["111", "690"] },
    { date: "2025-10-16", first: "059696", last2: "61", front3: ["531", "955"], back3: ["476", "889"] },
    { date: "2025-10-01", first: "876978", last2: "77", front3: ["843", "532"], back3: ["280", "605"] },
  ];
}
