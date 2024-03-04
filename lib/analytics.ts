import adaptAccessData from "./access-adapter";
import adaptItemLoad from "./adapt-item-load";
import getLocation from "./get-location-data";
import adaptTrack from "./track-adapter";
import TrackId from "./uuid";

type Data = { itemId?: string; itemPrice?: string; itemName?: string; itemShipping?: string };
type Common = { eventName?: string; data: Data; };
type ParamAccess = { appName?: string } & Common;
type ParamTrack = { data: {}, eventName: string } & Omit<Common, 'data'>;
type Item = { itemId: string; itemPrice: string; itemName: string; itemShipping: string; };
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

    async trackAppAccess(payload: ParamAccess): Promise<void> {
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
            if (typeof window === 'undefined') return console.error(error);
            const maxTry = window.sessionStorage.getItem('maxTryAnalytics');
            if (maxTry) {
                if (parseInt(maxTry) >= 3) return console.error(error);
                window.sessionStorage.setItem('maxTryAnalytics', (parseInt(maxTry) + 1).toString());
            }
            window.sessionStorage.removeItem('trackId');
            console.error(error);
        }
    }

    track(payload: ParamTrack): void {
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

    itemLoad(payload: { data: Item }): void {
        try {
            if (typeof window === 'undefined') return;
            const trackId = this.uuid();
            const event = adaptItemLoad({ ...payload.data, trackId });
            this.socket.send(event);
        } catch (error) {
            console.error(error);
        }
    }

    beforeunload(): void {
        try {
            if (typeof window === 'undefined') return;
            const trackId = this.uuid();
            if (this.socket.readyState !== 1) return;
            const exitAt = new Date().getTime();
            const event = adaptTrack({ trackId, data: { exitAt }, eventName: 'exitPage' });
            this.socket.send(event);
        } catch (error) {
            console.error(error);
        }
    }

    onScrollEnd(): void {
        try {
            if (typeof window === 'undefined') return;
            const trackId = this.uuid();
            if (this.socket.readyState !== 1) return;
            const scrollY = window.scrollY || window.pageYOffset;
            const scrollX = window.scrollX || window.pageXOffset;
            const event = adaptTrack({ trackId, data: { scrollY, scrollX }, eventName: 'scrollPage' });
            this.socket.send(event);
        } catch (error) {
            console.error(error);
        }
    }
}
