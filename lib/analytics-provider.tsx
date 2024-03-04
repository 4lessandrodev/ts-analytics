import React from 'react';
import { ReactElement, createContext, useEffect, useMemo, useState } from 'react';
import TsAnalytics from './analytics';

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

export const AnalyticsContext = createContext<TsAnalytics | null>(null);

/**
 * Apply analytics listeners `load`, `scrollend`, and `beforeunload` to the page.
 * @param {object} props - Props do componente.
 * @param {ReactNode} props.children - Elemento React a ser renderizado dentro do componente.
 * @param {object} props.analytics - Objeto contendo informações de analytics, como URL, dados e nome do aplicativo.
 * @returns {ReactNode} O elemento React renderizado.
 */
export function AnalyticsProvider({ children, analytics }: Props): ReactElement {
    const [listenersAdded, setListenersAdded] = useState(false);
    const analytic = useMemo((): TsAnalytics => TsAnalytics.init(analytics.url), [analytics.url]);

    useEffect((): () => void => {
        const trackDomTimeout = setTimeout((): (() => void) | undefined => {
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
        }, 3000);

        const trackAppAccessTimeout = setTimeout((): void => {
            analytic.trackAppAccess({
                data: analytics.data ?? {},
                appName: analytics.appName
            });
        }, 5000);

        return (): void => {
            clearTimeout(trackAppAccessTimeout);
            clearTimeout(trackDomTimeout);
        };
    }, [analytics.url, analytic, listenersAdded, analytics.data, analytics.appName]);

    useEffect((): () => void => {
        return (): void => {
            analytic.close();
        };
    }, [analytic]);

    return (
        <AnalyticsContext.Provider value={analytic}>
          {children}
        </AnalyticsContext.Provider>
      );
}

export default AnalyticsProvider;
