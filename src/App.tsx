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
import { ThemeToggle } from './ThemeToggle';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  PointElement, LineElement, Filler
);

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [timeRange, setTimeRange] = useState('day');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load theme preference from storage
    chrome.storage.local.get(['theme'], (result) => {
      setIsDark(result.theme === 'dark');
    });
  }, []);

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

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    chrome.storage.local.set({ theme: newTheme ? 'dark' : 'light' });
  };

  const stats = calculateStats(history);

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="w-96 min-h-[500px] max-h-[500px] overflow-y-auto">
        <div className={`p-4 min-h-full ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
          <div className="relative">
            <h1 className="text-2xl font-bold mb-4">Browser History Insights</h1>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
          
          <TimeRangeSelector 
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            loading={loading}
            isDark={isDark}
          />

          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-2 rounded shadow text-center`}>
              <div className="text-xl font-bold">{stats.totalVisits}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Visits</div>
            </div>
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-2 rounded shadow text-center`}>
              <div className="text-xl font-bold">{stats.uniqueDomains}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Unique Sites</div>
            </div>
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-2 rounded shadow text-center`}>
              <div className="text-xl font-bold">{stats.recentVisits}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Today's Visits</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-4 border-b border-gray-300">
            <button
              className={`py-2 px-4 ${activeTab === 'overview' ? 
                `border-b-2 ${isDark ? 'border-blue-400' : 'border-blue-500'}` : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'timing' ? 
                `border-b-2 ${isDark ? 'border-blue-400' : 'border-blue-500'}` : ''}`}
              onClick={() => setActiveTab('timing')}
            >
              Timing
            </button>
          </div>

          {loading ? (
            <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</div>
          ) : (
            <div className="space-y-4">
              {activeTab === 'overview' && (
                <>
                  <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
                    <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Top Domains
                    </h2>
                    <DomainChart data={getDomainData(history)} isDark={isDark} />
                  </div>
                  
                  <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
                    <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Most Visited Sites
                    </h2>
                    <TopSitesTable history={history} isDark={isDark} />
                  </div>
                </>
              )}

              {activeTab === 'timing' && (
                <>
                  <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
                    <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Hourly Activity
                    </h2>
                    <HourlyActivityChart history={history} isDark={isDark} />
                  </div>

                  <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
                    <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Weekly Pattern
                    </h2>
                    <WeekdayChart history={history} isDark={isDark} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;