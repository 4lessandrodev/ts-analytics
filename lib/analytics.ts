import adaptAccessData from "./access-adapter";
import getLocation from "./get-location-data";
import adaptTrack from "./track-adapter";
import TrackId from "./uuid";

type Data = { itemId: string; itemPrice?: string; itemName: string; itemShipping?: string };
type Common = { eventName?: string; data: Data; };
type ParamAccess = { appName?: string } & Common;
type ParamTrack = { data: {}, eventName: string } & Omit<Common, 'data'>;

export default class TsAnalytics {

    private constructor(
        private readonly socket: WebSocket
    ) { }

    public static init(socketUrl: string | URL, protocols?: string | string[]): TsAnalytics {
        if (this.prototype?.socket?.readyState === 1) return new TsAnalytics(this.prototype.socket);
        const socket = new WebSocket(socketUrl, protocols);
        socket.onerror = console.error;
        return new TsAnalytics(socket);
    }

    private getTrackId(): string | null {
        return window.sessionStorage.getItem('trackId');
    }

    private uuid(): string {
        return this.getTrackId() ?? TrackId();
    }

    private setTrackId(id: string): void {
        window.sessionStorage.setItem('trackId', id);
    }

    private alreadySaved(): boolean {
        return !!this.getTrackId();
    }

    public close(): void {
        if (this.socket.readyState !== 1) return;
        this.socket.close();
    }

    async trackAppAccess(payload: ParamAccess) {
        try {
            if (typeof window === 'undefined') return;
            if (this.alreadySaved()) return;
            const trackId = TrackId();
            if (this.socket.readyState !== 1) return;
            this.setTrackId(trackId);
            const location = await getLocation();
            if (!location.ip) return;
            const event = adaptAccessData({ ...payload, location, trackId });
            this.socket.send(event);
        } catch (error) {
            console.error(error);
        }
    }

    track(payload: ParamTrack) {
        try {
            if (typeof window === 'undefined') return;
            const trackId = this.uuid();
            if (this.socket.readyState !== 1) return;
            this.setTrackId(trackId);
            const event = adaptTrack({ ...payload, trackId });
            this.socket.send(event);
        } catch (error) {
            console.error(error);
        }
    }
}
