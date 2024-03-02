type Data = {
    itemId: string;
    itemPrice?: string;
    itemName: string;
    itemShipping?: string;
};
type Common = {
    eventName?: string;
    data: Data;
};
type ParamAccess = {
    appName?: string;
} & Common;
type ParamTrack = {
    data: {};
    eventName: string;
} & Omit<Common, 'data'>;
export default class TsAnalytics {
    private readonly socket;
    private constructor();
    static init(socketUrl: string | URL, protocols?: string | string[]): TsAnalytics;
    private getTrackId;
    private uuid;
    private setTrackId;
    private alreadySaved;
    close(): void;
    trackAppAccess(payload: ParamAccess): Promise<void>;
    track(payload: ParamTrack): void;
}
export {};
