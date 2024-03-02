type Payload = {
    city: null | string;
    country: null | string;
    country_name: null | string;
    currency: null | string;
    ip: null | string;
    latitude: null | number;
    longitude: null | number;
    timezone: null | string;
    region: null | string;
    postal: null | string;
    org: null | string;
    languages: null | string;
    utc_offset: null | string;
};
export default function getLocation(): Promise<Payload>;
export {};
