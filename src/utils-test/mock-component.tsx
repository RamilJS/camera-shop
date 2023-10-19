import { createMemoryHistory, MemoryHistory } from 'history';
import HistoryRouter from '../hocs/history-router';
import { HelmetProvider } from 'react-helmet-async';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}
