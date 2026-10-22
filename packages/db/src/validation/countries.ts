const names = new Intl.DisplayNames(["en"], { type: "region" });

// Mã không phải quốc gia mà Intl vẫn có tên
const EXCLUDE = new Set(["EU", "UN", "EZ", "ZZ", "QO", "XA", "XB", "AC", "CP", "DG", "EA", "IC", "TA"]);

export const countryName = (code: string) => names.of(code) ?? code;

export const countries = Array.from({ length: 26 * 26 }, (_, i) => String.fromCharCode(65 + Math.floor(i / 26)) + String.fromCharCode(65 + (i % 26)))
	.filter((code) => !EXCLUDE.has(code) && names.of(code) !== code)
	.map((code) => ({ code, name: names.of(code) as string }))
	.sort((a, b) => a.name.localeCompare(b.name));
