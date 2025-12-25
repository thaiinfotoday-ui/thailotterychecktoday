import { getLotteryData } from '@/lib/lotteryService';
import { getHistoryData } from '@/lib/historyData';
import HomeClient from './components/HomeClient';

// Server Component
export default async function Home() {
  let initialData = null;
  let historyData = null;

  try {
    initialData = await getLotteryData();
    const historyRes = await getHistoryData();
    historyData = historyRes.results.slice(0, 5); // Latest 5
  } catch (e) {
    console.error("Failed to fetch data for home page:", e);
    // Render with null data, let Client Component handle empty state or fallback
  }

  return <HomeClient initialData={initialData} history={historyData} />;
}
