type BrowserInfo = {
    browser: {
        userAgent: string;
        platform: string;
        mobile: boolean;
        language: string;
        brands: { brand: string; version: string }[];
        height: number;
        width: number;
    }
}

type PlatformInfo = {
    userAgentData: { 
        brands?: [];
        platform: string;
    };
}

export default function getBrowserInfo(): BrowserInfo {
    const _navigator: Navigator & PlatformInfo = window.navigator as Navigator & PlatformInfo;
    const userAgentData = _navigator?.userAgentData ?? {};
    const userAgent = _navigator.userAgent ?? '';
    const platform = _navigator.platform ?? userAgentData?.platform ?? '';
    const language = _navigator.language ?? '';
    const vendor = _navigator.vendor ?? '';
    const vendorSub = _navigator.vendorSub ?? '';
    const width = window.screen.width;
    const height = window.screen.height;
    const mobile = /mobi|android/i.test(userAgent.toLowerCase());
    const brands = userAgentData?.brands ?? [{ brand: vendor, version: vendorSub }];

    return {
        browser: {
            userAgent,
            platform,
            mobile,
            language,
            brands,
            width,
            height
        }
    };
}
