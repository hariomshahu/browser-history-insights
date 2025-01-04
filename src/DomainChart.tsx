import { Bar } from 'react-chartjs-2';
import { ChartData } from '../src/types/history';

interface DomainChartProps {
  data: ChartData;
}

export const DomainChart: React.FC<DomainChartProps> = ({ data }) => (
  <Bar 
    data={data} 
    options={{
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }} 
  />
);
