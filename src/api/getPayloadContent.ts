export const getPayloadContent = async (url: string, currentLanguage: string) => {
    const res = await fetch(`${url}?locale=${currentLanguage}`);
    return await res.json();
};
