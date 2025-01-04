import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { HistoryItem } from '../src/types/history';
import { TimeRangeSelector } from './TimeRangeSelector';
import { DomainChart } from './DomainChart';
import { getTimeRangeMs } from './utils/timeUtils';
import { getDomainData } from './utils/chartUtils';

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

  return (
    <div className="p-4 w-96 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Browser History Insights</h1>
      
      <TimeRangeSelector 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        loading={loading}
      />

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Top Domains</h2>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <DomainChart data={getDomainData(history)} />
        )}
      </div>
    </div>
  );
};

export default App;