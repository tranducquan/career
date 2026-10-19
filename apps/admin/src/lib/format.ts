export const day = (date: Date) => date.toISOString().slice(0, 10);

export const yesNo = (value: boolean) => (value ? "Yes" : "-");

export const dash = (value: string | number | null | undefined) => (value === null || value === undefined || value === "" ? "-" : String(value));

// Danh sách hiện thành một dòng, ngăn cách bằng dấu phẩy
export const joined = (items: string[]) => (items.length > 0 ? items.join(", ") : "-");
