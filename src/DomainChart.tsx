import { Bar } from 'react-chartjs-2';
import { ChartData } from '../src/types/history';

interface DomainChartProps {
  data: ChartData;
  isDark: boolean;
}

export const DomainChart: React.FC<DomainChartProps> = ({ data , isDark}) => (
  <Bar 
    data={{
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }))
  }} 
    options={{
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
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
