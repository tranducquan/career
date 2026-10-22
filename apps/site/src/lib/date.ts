const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-09-14" → "14 Sep, 2026" (tách chuỗi, không dùng Date nên không lệch múi giờ)
export const formatDate = (value?: string) => {
	const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (!match) return value;
	return `${Number(match[3])} ${MONTHS[Number(match[2]) - 1]}, ${match[1]}`;
};
