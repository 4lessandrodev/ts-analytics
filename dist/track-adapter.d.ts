type Data = {
    itemId: string;
    itemPrice?: string;
    itemName: string;
};
type Common = {
    eventName: string;
    data: Data;
};
type ParamTrack = {
    data: {};
    trackId: string;
} & Omit<Common, 'data'>;
export default function adaptTrack(payload: ParamTrack): string;
export {};
