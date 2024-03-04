import { useEffect, useMemo } from 'react';
import TsAnalytics from './analytics';

export function useTsAnalytics(url: string | URL): TsAnalytics {
  const analytic = useMemo((): TsAnalytics => TsAnalytics.init(url), [url]);

  useEffect((): () => void => {
    return (): void => {
      analytic.close();
    };
  }, [analytic]);

  return analytic;
}

export default useTsAnalytics;
