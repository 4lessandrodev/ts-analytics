type Data = { itemId: string; itemPrice?: string; itemName: string; };
type Common = { eventName: string; data: Data; };
type ParamTrack = { data: { }, trackId: string; } & Omit<Common, 'data'>;

export default function adaptTrack(payload: ParamTrack): string {
    const timeStamp = new Date().getTime();
    const eventName = payload?.['eventName'] ?? 'track';
    const isObject = typeof payload.data === 'object';
    const data = isObject ? { ...(payload.data ?? {}) } : payload.data;
    const route = window.location.pathname;
    const event = { timeStamp, eventName, data, route };
    const eventData = { trackId: payload.trackId, event, node: 'CHILD' };
    return JSON.stringify(eventData);
}
