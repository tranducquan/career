// Dùng Web Crypto để chạy được cả trong proxy lẫn server action.
export const COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 giờ, tính bằng giây

const encoder = new TextEncoder();

const getKey = () => {
	const secret = process.env.ADMIN_SESSION_SECRET;
	if (!secret || secret.length < 32) {
		throw new Error("ADMIN_SESSION_SECRET chưa được đặt hoặc ngắn hơn 32 ký tự");
	}
	return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
};

const toHex = (buffer: ArrayBuffer) =>
	Array.from(new Uint8Array(buffer))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");

const fromHex = (hex: string) => {
	if (!/^(?:[0-9a-f]{2})+$/.test(hex)) return null;
	return Uint8Array.from(hex.match(/../g)!, (pair) => Number.parseInt(pair, 16));
};

// Token có dạng "<thời điểm hết hạn>.<chữ ký HMAC>"
export const createSessionToken = async () => {
	const expiresAt = String(Date.now() + SESSION_MAX_AGE * 1000);
	const signature = await crypto.subtle.sign("HMAC", await getKey(), encoder.encode(expiresAt));
	return `${expiresAt}.${toHex(signature)}`;
};

export const verifySessionToken = async (token?: string) => {
	if (!token) return false;

	const [expiresAt, signatureHex, ...rest] = token.split(".");
	if (!expiresAt || !signatureHex || rest.length > 0) return false;

	const signature = fromHex(signatureHex);
	if (!signature) return false;

	// verify của Web Crypto so sánh theo kiểu hằng thời gian
	const valid = await crypto.subtle.verify("HMAC", await getKey(), signature, encoder.encode(expiresAt));
	return valid && Number(expiresAt) > Date.now();
};
