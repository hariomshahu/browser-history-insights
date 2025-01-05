import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, Filler, PointElement } from 'chart.js';
import { HistoryItem } from '../src/types/history';
import { TimeRangeSelector } from './TimeRangeSelector';
import { DomainChart } from './DomainChart';
import { getTimeRangeMs } from './utils/timeUtils';
import { getDomainData } from './utils/chartUtils';
import { HourlyActivityChart } from './HourlyActivityChart';
import { WeekdayChart } from './WeekdayChart';
import { TopSitesTable } from './TopSitesTable';
import { calculateStats } from './utils/analyticsUtils';


ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  PointElement, LineElement, Filler
);

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [timeRange, setTimeRange] = useState('day');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');


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

  const stats = calculateStats(history);

  return (
    <div className="p-4 w-96 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Browser History Insights</h1>
      
      <TimeRangeSelector 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        loading={loading}
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white p-2 rounded shadow text-center">
          <div className="text-xl font-bold">{stats.totalVisits}</div>
          <div className="text-xs text-gray-600">Total Visits</div>
        </div>
        <div className="bg-white p-2 rounded shadow text-center">
          <div className="text-xl font-bold">{stats.uniqueDomains}</div>
          <div className="text-xs text-gray-600">Unique Sites</div>
        </div>
        <div className="bg-white p-2 rounded shadow text-center">
          <div className="text-xl font-bold">{stats.recentVisits}</div>
          <div className="text-xs text-gray-600">Today's Visits</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-4 border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'overview' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'timing' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('timing')}
        >
          Timing
        </button>
      </div>
      
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="space-y-4">
          {activeTab === 'overview' && (
            <>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">Top Domains</h2>
                <DomainChart data={getDomainData(history)} />
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">Most Visited Sites</h2>
                <TopSitesTable history={history} />
              </div>
            </>
          )}
      
      {activeTab === 'timing' && (
        <>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Hourly Activity</h2>
            <HourlyActivityChart history={history} />
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Weekly Pattern</h2>
            <WeekdayChart history={history} />
          </div>
        </>
      )}
    </div>
  )}
</div>
  );
};

export default App;