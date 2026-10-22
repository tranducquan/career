const names = new Intl.DisplayNames(["en"], { type: "region" });

export const countryName = (code: string) => names.of(code) ?? code;
