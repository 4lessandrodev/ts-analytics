type Payload = {
    asn: string;
    city: string;
    continent_code: string;
    country: string;
    country_area: number;
    country_calling_code: string;
    country_capital: string;
    country_code: string;
    country_code_iso3: string;
    country_name: string;
    country_population: number;
    country_tld: string;
    currency: string;
    currency_name: string;
    in_eu: string;
    ip: string;
    languages: string;
    latitude: number;
    longitude: number;
    network: string;
    org: string;
    postal: string;
    region: string;
    region_code: string;
    timezone: string;
    utc_offset: string;
    version: string;
}

export default function getLocationByIp(ip: string): Promise<Payload | null> {
    return new Promise((resolve) => {
        if (typeof ip !== 'string') return resolve(null);
        fetch(`https://ipapi.co/${ip}/json/`)
            .then((res) => res.json().then((data) => resolve(data)))
            .catch(() => resolve(null));
    })
};
