type FormatCurrencyOptions = {
  locale?: string;
  currency?: string;
};

export function formatCurrency(
  value: number,
  { locale = "en-US", currency = "USD" }: FormatCurrencyOptions = {},
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}
