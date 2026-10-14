"use server";

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactState = {
	status: "idle" | "success" | "error";
	message?: string;
	errors?: Partial<Record<ContactField, string>>;
	values?: Record<ContactField, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
	// Ô ẩn dành cho bot: người thật không điền. Giả vờ thành công để bot không dò ra
	if (formData.get("website")) return { status: "success", message: "Đã gửi tin nhắn." };

	const get = (key: ContactField) => String(formData.get(key) ?? "").trim();
	const values = { name: get("name"), email: get("email"), subject: get("subject"), message: get("message") };

	const errors: ContactState["errors"] = {};
	if (values.name.length < 2) errors.name = "Vui lòng nhập họ tên.";
	if (!EMAIL_RE.test(values.email)) errors.email = "Email chưa hợp lệ.";
	if (values.subject.length < 3) errors.subject = "Vui lòng nhập tiêu đề.";
	if (values.message.length < 10) errors.message = "Nội dung cần ít nhất 10 ký tự.";
	if (values.message.length > 2000) errors.message = "Nội dung tối đa 2000 ký tự.";

	if (Object.keys(errors).length > 0) {
		return { status: "error", message: "Vui lòng kiểm tra lại thông tin.", errors, values };
	}

	try {
		// TODO: gửi email thật (Resend, Nodemailer...) hoặc lưu vào database
		console.log("[contact]", values);
	} catch {
		return { status: "error", message: "Không gửi được tin nhắn, vui lòng thử lại sau.", values };
	}

	return { status: "success", message: "Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất có thể." };
}
