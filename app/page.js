import { getLotteryData } from '@/lib/lotteryService';
import { getHistoryData } from '@/lib/historyData';
import { getAllPosts } from '@/lib/blogService';
import HomeClient from './components/HomeClient';

// Server Component
export default async function Home() {
  let initialData = null;
  let historyData = null;
  let latestPosts = [];

  try {
    initialData = await getLotteryData();
    const historyRes = await getHistoryData();
    historyData = historyRes.results.slice(0, 5); // Latest 5

    // Fetch latest blogs
    const allPosts = await getAllPosts();
    latestPosts = allPosts
      .filter(p => p.status === 'published')
      .slice(0, 4);

  } catch (e) {
    console.error("Failed to fetch data for home page:", e);
  }

  return <HomeClient initialData={initialData} history={historyData} latestPosts={latestPosts} />;
}
