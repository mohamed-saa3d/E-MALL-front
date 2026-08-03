type FormatDateOptions = {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

export function formatDate(
  date: string | Date,
  {
    locale = "en-US",
    options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  }: FormatDateOptions = {},
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}
