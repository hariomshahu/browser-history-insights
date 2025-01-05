import React from 'react';
import { HistoryItem } from '../src/types/history';

interface TopSitesTableProps {
  history: HistoryItem[];
  limit?: number;
}

export const TopSitesTable: React.FC<TopSitesTableProps> = ({ history, limit = 5 }) => {
  const domains = history.reduce((acc, item) => {
    const domain = new URL(item.url).hostname;
    acc[domain] = (acc[domain] || 0) + item.visitCount;
    return acc;
  }, {} as Record<string, number>);

  const sortedDomains = Object.entries(domains)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left">Domain</th>
            <th className="p-2 text-right">Visits</th>
          </tr>
        </thead>
        <tbody>
          {sortedDomains.map(([domain, count]) => (
            <tr key={domain} className="border-t">
              <td className="p-2">{domain}</td>
              <td className="p-2 text-right">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};