import React from 'react';
import { Bar } from 'react-chartjs-2';
import { HistoryItem } from '../src/types/history';

interface WeekdayChartProps {
  history: HistoryItem[];
  isDark: boolean;
}

export const WeekdayChart: React.FC<WeekdayChartProps> = ({ history, isDark }) => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekdayData = Array(7).fill(0);

  history.forEach(item => {
    const day = new Date(item.lastVisitTime).getDay();
    weekdayData[day] += item.visitCount;
  });

  const data = {
    labels: weekdays,
    datasets: [{
      label: 'Activity by Day',
      data: weekdayData,
      backgroundColor: isDark ? '#9d8cf7' : '#9966FF'
    }]
  };

  return (
    <Bar 
      data={data}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Browsing Activity by Day of Week',
            color: isDark ? '#e5e7eb' : '#1f2937'
          },
          legend: {
            labels: {
              color: isDark ? '#e5e7eb' : '#1f2937'
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: isDark ? '#9ca3af' : '#4b5563'
            }
          },
          y: {
            grid: {
              color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: isDark ? '#9ca3af' : '#4b5563'
            }
          }
        }
      }}
    />
  );
};
