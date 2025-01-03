export interface HistoryItem {
    id: string;
    url: string;
    title: string;
    visitCount: number;
    lastVisitTime: number;
  }
  
  export interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  }