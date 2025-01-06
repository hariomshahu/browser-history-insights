// import React from 'react';

// interface TimeRangeSelectorProps {
//   timeRange: string;
//   setTimeRange: (range: string) => void;
//   loading: boolean;
// }

// export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
//   timeRange, 
//   setTimeRange, 
//   loading 
// }) => (
//   <div className="mb-4">
//     <select
//       value={timeRange}
//       onChange={(e) => setTimeRange(e.target.value)}
//       className="p-2 border rounded bg-white"
//       disabled={loading}
//     >
//       <option value="day">Last 24 Hours</option>
//       <option value="week">Last Week</option>
//       <option value="month">Last Month</option>
//     </select>
//   </div>
// );
import React from 'react';

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  loading: boolean;
  isDark: boolean;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  timeRange, 
  setTimeRange, 
  loading,
  isDark 
}) => (
  <div className="mb-4">
    <select
      value={timeRange}
      onChange={(e) => setTimeRange(e.target.value)}
      className={`p-2 border rounded w-full cursor-pointer
        ${isDark ? 'bg-gray-700 text-gray-200 border-gray-600':'bg-white text-gray-800 border-gray-300'}`}
      disabled={loading}
    >
      <option value="hour">Last Hour</option>
      <option value="6hours">Last 6 Hours</option>
      <option value="12hours">Last 12 Hours</option>
      <option value="day">Last 24 Hours</option>
      <option value="3days">Last 3 Days</option>
      <option value="week">Last Week</option>
      <option value="2weeks">Last 2 Weeks</option>
      <option value="month">Last Month</option>
      <option value="3months">Last 3 Months</option>
      <option value="6months">Last 6 Months</option>
      <option value="year">Last Year</option>
    </select>
  </div>
);