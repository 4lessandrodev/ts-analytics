import getDomainFromURL from "./get-domain-from-url";

type Data = { itemId: string; itemPrice?: string; itemName: string; itemShipping?: string };
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
    const eventData = {
        appName,
        eventName,
        trackId,
        events: [event],
        timeStamp,
        location: payload.location,
        node,
        route,
        search,
        item: {
            id: data.itemId,
            name: data.itemName,
            price: data.itemPrice ?? '0.00',
            shipping: data.itemShipping ?? '0.00' 
        }
    };
    return JSON.stringify(eventData);
}
