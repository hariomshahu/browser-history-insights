// export const getTimeRangeMs = (range: string): number => {
//     const day = 24 * 60 * 60 * 1000;
//     switch (range) {
//       case 'day': return day;
//       case 'week': return 7 * day;
//       case 'month': return 30 * day;
//       default: return day;
//     }
//   };
export const getTimeRangeMs = (range: string): number => {
    const hour = 60 * 60 * 1000;
    const day = 24 * hour;
    switch (range) {
      case 'hour': return hour;
      case '6hours': return 6 * hour;
      case '12hours': return 12 * hour;
      case 'day': return day;
      case '3days': return 3 * day;
      case 'week': return 7 * day;
      case '2weeks': return 14 * day;
      case 'month': return 30 * day;
      case '3months': return 90 * day;
      case '6months': return 180 * day;
      case 'year': return 365 * day;
      default: return day;
    }
  };