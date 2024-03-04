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
 * Apply analytics listeners `load`, `scrollend`, and `beforeunload` to the page.
 * @param {object} props - Props do componente.
 * @param {ReactNode} props.children - Elemento React a ser renderizado dentro do componente.
 * @param {object} props.analytics - Objeto contendo informações de analytics, como URL, dados e nome do aplicativo.
 * @returns {ReactNode} O elemento React renderizado.
 */
export function AnalyticsProvider({ children, analytics }: Props): ReactElement {
    const analytic = useTsAnalytics(analytics.url);
    const [listenersAdded, setListenersAdded] = useState(false);

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

        return () : void => {
            clearTimeout(trackAppAccessTimeout);
            clearTimeout(trackDomTimeout);
        };
    }, [analytics.url, analytic, listenersAdded, analytics.data, analytics.appName]);

    return children;
}

export default AnalyticsProvider;

