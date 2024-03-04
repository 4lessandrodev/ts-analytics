import { useContext } from 'react';
import TsAnalytics from './analytics';
import { AnalyticsContext } from './analytics-provider';

export function useTsAnalytics(): TsAnalytics {
  const analytic = useContext(AnalyticsContext);
  if (!analytic) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return analytic;
}

export default useTsAnalytics;
