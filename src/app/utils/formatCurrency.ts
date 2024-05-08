export const formatCurrency = (amount: number, code: string = "USD", lang: string = "en-US") => {
    return new Intl.NumberFormat(lang, { style: "currency", currency: code }).format(amount);
};
export const formatQuoteCurrency = (amount: number, code: string = "USD", lang: string = "en-US") => {
    const value = new Intl.NumberFormat(lang).format(amount);
    return value;
};
