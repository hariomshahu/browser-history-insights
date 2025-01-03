import { HistoryItem } from '../types/history';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Browser History Insights installed');
});

async function fetchHistory(startTime: number, endTime: number): Promise<HistoryItem[]> {
  const items = await chrome.history.search({
    text: '',
    startTime,
    endTime,
    maxResults: 5000
  });

  return items.map(item => ({
    id: item.id!,
    url: item.url!,
    title: item.title || 'Untitled',
    visitCount: item.visitCount || 0,
    lastVisitTime: item.lastVisitTime!
  }));
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === 'FETCH_HISTORY') {
    fetchHistory(request.startTime, request.endTime)
      .then(data => sendResponse({ data }))
      .catch(error => sendResponse({ error: error.message }));
    return true;
  }
});