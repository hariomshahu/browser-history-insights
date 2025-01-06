import React from 'react';
import { Line } from 'react-chartjs-2';
import { HistoryItem } from '../src/types/history';

interface HourlyActivityChartProps {
  history: HistoryItem[];
  isDark: boolean;
}

export const HourlyActivityChart: React.FC<HourlyActivityChartProps> = ({ history, isDark }) => {
  const hourlyData = Array(24).fill(0);
  
  history.forEach(item => {
    const hour = new Date(item.lastVisitTime).getHours();
    hourlyData[hour] += item.visitCount;
  });

  const data = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [{
      label: 'Activity by Hour',
      data: hourlyData,
      fill: true,
      borderColor: isDark ? '#4fd1c5' : '#4BC0C0',
      backgroundColor: isDark ? 'rgba(79, 209, 197, 0.1)' : 'rgba(75, 192, 192, 0.2)',
      tension: 0.4
    }]
  };

  return (
    <Line 
      data={data}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Browsing Activity by Hour'
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
            beginAtZero: true,
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