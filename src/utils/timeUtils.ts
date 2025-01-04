export const getTimeRangeMs = (range: string): number => {
    const day = 24 * 60 * 60 * 1000;
    switch (range) {
      case 'day': return day;
      case 'week': return 7 * day;
      case 'month': return 30 * day;
      default: return day;
    }
  };