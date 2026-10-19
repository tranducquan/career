// Id là số nguyên dương trong khoảng int32 của Postgres, nên giới hạn 9 chữ số
export const parseId = (value: string | undefined) => (value && /^\d{1,9}$/.test(value) && Number(value) > 0 ? Number(value) : null);

export const parsePage = (value: string | undefined) => {
	const page = Number.parseInt(value ?? "", 10);
	return Number.isNaN(page) || page < 1 ? 1 : Math.min(page, 100000);
};
