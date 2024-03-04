import getBrowserInfo from "./get-browser-info";
import getDomainFromURL from "./get-domain-from-url";

type Data = { itemId?: string; itemPrice?: string; itemName?: string; itemShipping?: string };
type Common = { eventName?: string; data: Data; location: any };
type ParamAccess = { appName?: string; trackId: string; } & Common;

export default function adaptAccessData(payload: ParamAccess) {
    const timeStamp = new Date().getTime();
    const eventName = payload?.eventName ?? 'siteAccess';
    const isObject = typeof payload.data === 'object';
    const route = window.location.pathname;
    const search = window.location.search;
    const data = isObject ? { ...(payload.data ?? {}) } : payload.data;
    const node = 'HEAD';
    const trackId = payload.trackId;
    const appName = payload.appName ?? getDomainFromURL(window.location.href);
    const event = { timeStamp, eventName, data, route };
    const { browser } = getBrowserInfo();
    const eventData = {
        trackId,
        appName,
        eventName,
        node,
        route,
        address: payload.location,
        events: [event],
        loadAt: timeStamp,
        exitAt: null,
        search,
        browser,
        item: {
            id: data?.itemId ?? null,
            name: data?.itemName ?? null,
            price: data?.itemPrice ?? null,
            shipping: data?.itemShipping ?? null
        }
    };
    return JSON.stringify(eventData);
}
