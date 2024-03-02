export default function getUserLocation(): Promise<{ ip: string } | null> {
    return new Promise((resolve) => {
        fetch(`https://api.ipify.org?format=json`)
            .then((res) => res.json().then((data) => resolve(data)))
            .catch(() => resolve(null));
    })
};
