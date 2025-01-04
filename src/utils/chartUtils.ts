import { HistoryItem, ChartData } from '../types/history';

export const getDomainData = (history: HistoryItem[]): ChartData => {
  console.log('Processing history items:', history.length);
  const domains = history.reduce((acc, item) => {
    const domain = new URL(item.url).hostname;
    acc[domain] = (acc[domain] || 0) + item.visitCount;
    return acc;
  }, {} as Record<string, number>);

  const sortedDomains = Object.entries(domains)
    .sort(([, visitCountA], [, visitCountB]) => visitCountB - visitCountA)
    .slice(0, 10);

  return {
    labels: sortedDomains.map(([domain]) => domain),
    datasets: [{
      label: 'Visit Count',
      data: sortedDomains.map(([, count]) => count),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
      ]
    }]
  };
};
