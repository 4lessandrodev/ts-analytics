import { ReactElement, useEffect, useState } from 'react';
import useTsAnalytics from './use-analytics';

type Data = {
    itemId?: string;
    itemPrice?: string;
    itemName?: string;
    itemShipping?: string
};

type Props = {
    children: ReactElement;
    analytics: {
        url: string | URL;
        data?: Data;
        appName?: string;
    }
}

/**
 * @description Apply analytics listeners `load`, `scrollend` and `beforeunload` to page
 * @param children ReactElement
 * @param analytics as Object
 * @returns ReactElement
 */
export function AnalyticsProvider({ children, analytics }: Props): ReactElement {
    const analytic = useTsAnalytics(analytics.url);
    const [listenersAdded, setListenersAdded] = useState(false);

    setTimeout((): void => {
        analytic.trackAppAccess({
            data: analytics.data ?? {},
            appName: analytics.appName
        });
    }, 5000);

    useEffect((): (() => void) | undefined => {
        if (!listenersAdded) {
            const scrollEndHandler = (): void => {
                analytic.onScrollEnd();
            };

            const beforeunloadHandler = (): void => {
                analytic.beforeunload();
            };

            window.addEventListener('scrollend', scrollEndHandler);
            window.addEventListener('beforeunload', beforeunloadHandler);

            setListenersAdded(true);

            return (): void => {
                window.removeEventListener('scrollend', scrollEndHandler);
                window.removeEventListener('beforeunload', beforeunloadHandler);
            };
        }
    }, [listenersAdded]);

    return children;
}

export default AnalyticsProvider;
