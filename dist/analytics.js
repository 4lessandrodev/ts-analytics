import adaptAccessData from "./access-adapter";
import getLocation from "./get-location-data";
import adaptTrack from "./track-adapter";
import TrackId from "./uuid";
export default class TsAnalytics {
    constructor(socket) {
        this.socket = socket;
    }
    static init(socketUrl, protocols) {
        if (this.prototype?.socket?.readyState === 1)
            return new TsAnalytics(this.prototype.socket);
        const socket = new WebSocket(socketUrl, protocols);
        socket.onerror = console.error;
        return new TsAnalytics(socket);
    }
    getTrackId() {
        return window.sessionStorage.getItem('trackId');
    }
    uuid() {
        return this.getTrackId() ?? TrackId();
    }
    setTrackId(id) {
        window.sessionStorage.setItem('trackId', id);
    }
    alreadySaved() {
        return !!this.getTrackId();
    }
    close() {
        if (this.socket.readyState !== 1)
            return;
        this.socket.close();
    }
    async trackAppAccess(payload) {
        try {
            if (typeof window === 'undefined')
                return;
            if (this.alreadySaved())
                return;
            const trackId = TrackId();
            if (this.socket.readyState !== 1)
                return;
            this.setTrackId(trackId);
            const location = await getLocation();
            if (!location.ip)
                return;
            const event = adaptAccessData({ ...payload, location, trackId });
            this.socket.send(event);
        }
        catch (error) {
            console.error(error);
        }
    }
    track(payload) {
        try {
            if (typeof window === 'undefined')
                return;
            const trackId = this.uuid();
            if (this.socket.readyState !== 1)
                return;
            this.setTrackId(trackId);
            const event = adaptTrack({ ...payload, trackId });
            this.socket.send(event);
        }
        catch (error) {
            console.error(error);
        }
    }
}
