export const formatCurrency = (
  amount: number = 0,
  code: string = "USD",
  lang: string = "en-US",
  options?: Intl.NumberFormatOptions
) => {
  // return new Intl.NumberFormat(lang, { style: "currency", currency: code, ...options }).format(amount);
  const locale = lang === "en" ? "en-US" : "vi-VN";

  return Number(amount).toLocaleString(locale, {
    style: "currency",
    currency: code,
    ...options,
  });
};
export const formatQuoteCurrency = (
  amount: number,
  code: string = "USD",
  lang: string = "en-US"
) => {
  const value = new Intl.NumberFormat(lang).format(amount);
  return value;
};
export const formatCurrencyHasUnit = (
  amount: number,
  lang: string = "en-US"
) => {
  const value = amount / 1e9;
  return value.toFixed(2) + "B";
};
export const formatPercentage = (
  amount: number = 0,
  code: string = "USD",
  lang: string = "en-US",
  options?: Intl.NumberFormatOptions
) => {
  // return new Intl.NumberFormat(lang, { style: "currency", currency: code, ...options }).format(amount);
  const locale = lang === "en" ? "en-US" : "vi-VN";
  var formatter = new Intl.NumberFormat(locale, {
    style: "percent",
    currency: code,
    ...options,
  });
  return formatter.format(Number(amount));
};
