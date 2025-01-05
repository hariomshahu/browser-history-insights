import React from 'react';
import { Bar } from 'react-chartjs-2';
import { HistoryItem } from '../src/types/history';

interface WeekdayChartProps {
  history: HistoryItem[];
}

export const WeekdayChart: React.FC<WeekdayChartProps> = ({ history }) => {
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
      backgroundColor: '#9966FF'
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
            text: 'Browsing Activity by Day of Week'
          }
        }
      }}
    />
  );
};
