export const formatCurrency = (
    amount: number,
    code: string = "USD",
    lang: string = "en-US",
    options?: Intl.NumberFormatOptions
) => {
    return new Intl.NumberFormat(lang, { style: "currency", currency: code, ...options }).format(amount);
};
export const formatQuoteCurrency = (amount: number, code: string = "USD", lang: string = "en-US") => {
    const value = new Intl.NumberFormat(lang).format(amount);
    return value;
};
export const formatCurrencyHasUnit = (amount: number, lang: string = "en-US") => {
    const value = amount / 1e9;
    return value.toFixed(2) + "B";
};
