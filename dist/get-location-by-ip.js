export default function getLocationByIp(ip) {
    return new Promise((resolve) => {
        if (typeof ip !== 'string')
            return resolve(null);
        fetch(`https://ipapi.co/${ip}/json/`)
            .then((res) => res.json().then((data) => resolve(data)))
            .catch(() => resolve(null));
    });
}
;
