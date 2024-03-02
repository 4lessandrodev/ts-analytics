export default function adaptTrack(payload) {
    const timeStamp = new Date().getTime();
    const eventName = payload?.['eventName'] ?? 'track';
    const isObject = typeof payload.data === 'object';
    const data = isObject ? { ...(payload.data ?? {}) } : payload.data;
    const route = window.location.pathname;
    const event = { timeStamp, eventName, data, route };
    const eventData = { trackId: payload.trackId, event, node: 'CHILD' };
    return JSON.stringify(eventData);
}
