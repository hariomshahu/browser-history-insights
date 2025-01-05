import React from 'react';
import { Line } from 'react-chartjs-2';
import { HistoryItem } from '../src/types/history';

interface HourlyActivityChartProps {
  history: HistoryItem[];
}

export const HourlyActivityChart: React.FC<HourlyActivityChartProps> = ({ history }) => {
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
      borderColor: '#4BC0C0',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }}
    />
  );
};