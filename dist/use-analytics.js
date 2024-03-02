import { useEffect, useMemo } from 'react';
import TsAnalytics from './analytics';
export function useTsAnalytics(url) {
    const analytic = useMemo(() => TsAnalytics.init(url), [url]);
    useEffect(() => {
        return () => {
            analytic.close();
        };
    }, [analytic]);
    return analytic;
}
export default useTsAnalytics;
