type Item = { itemId: string; itemPrice: string; itemName: string; itemShipping: string; trackId: string; };

export default function adaptItemLoad(data: Item): string {
    return JSON.stringify({
        eventName: 'itemLoad',
        timeStamp: new Date().getTime(),
        route: window.location.pathname,
        data
    });
}
