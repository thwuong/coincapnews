export const fallbackLng = "en";
export const languages = [fallbackLng, "vi"];
export const cookieName = "NEXT_LANG";
export const defaultNS = "global";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
