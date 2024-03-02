export default function getDomainFromURL(url: string | URL): string {
    const str = url.toString();
    if (str.includes('localhost') || str.includes('127.0.0.1')) return 'localhost';
    return str.slice(str.indexOf('www.') + 4).slice(0, str.indexOf('.') - 1);
}
