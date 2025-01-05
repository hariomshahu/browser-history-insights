import { HistoryItem } from '../types/history';

export const calculateStats = (history: HistoryItem[]) => {
  const totalVisits = history.reduce((sum, item) => sum + item.visitCount, 0);
  const uniqueDomains = new Set(history.map(item => new URL(item.url).hostname)).size;
  
  const now = Date.now();
  const recentVisits = history.filter(item => 
    now - item.lastVisitTime < 24 * 60 * 60 * 1000
  ).length;

  return {
    totalVisits,
    uniqueDomains,
    recentVisits
  };
};