import React from 'react';

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  loading: boolean;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  timeRange, 
  setTimeRange, 
  loading 
}) => (
  <div className="mb-4">
    <select
      value={timeRange}
      onChange={(e) => setTimeRange(e.target.value)}
      className="p-2 border rounded bg-white"
      disabled={loading}
    >
      <option value="day">Last 24 Hours</option>
      <option value="week">Last Week</option>
      <option value="month">Last Month</option>
    </select>
  </div>
);