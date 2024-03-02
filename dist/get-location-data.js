import getLocationByIp from "./get-location-by-ip";
import getUserLocation from "./get-user-location";
export default async function getLocation() {
    const defaultPayload = {
        city: null,
        country: null,
        country_name: null,
        currency: null,
        ip: null,
        latitude: null,
        longitude: null,
        timezone: null,
        region: null,
        postal: null,
        org: null,
        languages: null,
        utc_offset: null
    };
    try {
        const dataOrNull = await getUserLocation();
        if (!dataOrNull?.ip)
            return defaultPayload;
        const locationOrNull = await getLocationByIp(dataOrNull.ip);
        if (!locationOrNull)
            return defaultPayload;
        return {
            city: locationOrNull.city,
            country: locationOrNull.country,
            country_name: locationOrNull.country_name,
            currency: locationOrNull.currency,
            ip: locationOrNull.ip,
            latitude: locationOrNull.latitude,
            longitude: locationOrNull.longitude,
            timezone: locationOrNull.timezone,
            region: locationOrNull.region,
            postal: locationOrNull.postal,
            org: locationOrNull.org,
            languages: locationOrNull.languages,
            utc_offset: locationOrNull.utc_offset
        };
    }
    catch (error) {
        return defaultPayload;
    }
}
