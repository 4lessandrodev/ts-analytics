type Data = {
    itemId: string;
    itemPrice?: string;
    itemName: string;
    itemShipping?: string;
};
type Common = {
    eventName?: string;
    data: Data;
    location: any;
};
type ParamAccess = {
    appName?: string;
    trackId: string;
} & Common;
export default function adaptAccessData(payload: ParamAccess): string;
export {};
