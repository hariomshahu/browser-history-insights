import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { HistoryItem, ChartData } from '../src/types/history';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [timeRange, setTimeRange] = useState('day');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const endTime = Date.now();
      const startTime = endTime - getTimeRangeMs(timeRange);

      const response = await chrome.runtime.sendMessage({
        type: 'FETCH_HISTORY',
        startTime,
        endTime
      });

      if (response.data) {
        setHistory(response.data);
      }
      setLoading(false);
    };

    fetchData();
  }, [timeRange]);

  const getTimeRangeMs = (range: string): number => {
    const day = 24 * 60 * 60 * 1000;
    switch (range) {
      case 'day': return day;
      case 'week': return 7 * day;
      case 'month': return 30 * day;
      default: return day;
    }
  };

  const getDomainData = (): ChartData => {
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

  return (
    <div className="p-4 w-96 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Browser History Insights</h1>
      
      <div className="mb-4">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="p-2 border rounded bg-white"
          disabled={loading}
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Top Domains</h2>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <Bar data={getDomainData()} options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }} />
        )}
      </div>
    </div>
  );
};

export default App;