"use client";

import { useState } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";

type Props = {
	// Tên field trong form. Nội dung được gửi đi dưới dạng Markdown
	name: string;
	defaultValue: string;
	label: string;
};

const buttonClass = (active: boolean) => `inline-flex h-7 min-w-7 cursor-pointer items-center justify-center border px-1.5 text-sm disabled:cursor-default disabled:opacity-40 ${active ? "border-wp-accent bg-white text-wp-accent" : "border-transparent text-wp-title hover:border-wp-border hover:bg-white"}`;

// Chỉ nhận liên kết http(s), mailto và đường dẫn nội bộ, còn lại tự thêm https://
const normalizeUrl = (value: string) => {
	const url = value.trim();
	if (!url) return "";
	return /^(https?:|mailto:|\/|#)/i.test(url) ? url : `https://${url}`;
};

const Toolbar = ({ editor }: { editor: Editor }) => {
	// Cập nhật trạng thái nút (đậm, nghiêng, ...) theo vị trí con trỏ
	const state = useEditorState({
		editor,
		selector: ({ editor: e }) => ({
			bold: e.isActive("bold"),
			italic: e.isActive("italic"),
			h2: e.isActive("heading", { level: 2 }),
			h3: e.isActive("heading", { level: 3 }),
			bullet: e.isActive("bulletList"),
			ordered: e.isActive("orderedList"),
			link: e.isActive("link"),
			canUndo: e.can().undo(),
			canRedo: e.can().redo(),
		}),
	});

	const setLink = () => {
		const previous = (editor.getAttributes("link").href as string | undefined) ?? "";
		const input = window.prompt("Link URL (leave empty to remove the link)", previous);
		if (input === null) return;
		const url = normalizeUrl(input);
		if (!url) editor.chain().focus().extendMarkRange("link").unsetLink().run();
		else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};

	return (
		<div role="toolbar" aria-label="Formatting" className="flex flex-wrap items-center gap-0.5 border-b border-wp-border bg-[#f6f7f7] p-1">
			<button type="button" title="Bold" aria-pressed={state.bold} onClick={() => editor.chain().focus().toggleBold().run()} className={`${buttonClass(state.bold)} font-bold`}>
				B
			</button>
			<button type="button" title="Italic" aria-pressed={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()} className={`${buttonClass(state.italic)} italic`}>
				I
			</button>
			<span className="mx-1 h-5 w-px bg-wp-border" aria-hidden />
			<button type="button" title="Heading 2" aria-pressed={state.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(state.h2)}>
				H2
			</button>
			<button type="button" title="Heading 3" aria-pressed={state.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonClass(state.h3)}>
				H3
			</button>
			<span className="mx-1 h-5 w-px bg-wp-border" aria-hidden />
			<button type="button" title="Bulleted list" aria-pressed={state.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(state.bullet)}>
				• List
			</button>
			<button type="button" title="Numbered list" aria-pressed={state.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(state.ordered)}>
				1. List
			</button>
			<span className="mx-1 h-5 w-px bg-wp-border" aria-hidden />
			<button type="button" title="Add or edit link" aria-pressed={state.link} onClick={setLink} className={buttonClass(state.link)}>
				Link
			</button>
			<span className="mx-1 h-5 w-px bg-wp-border" aria-hidden />
			<button type="button" title="Undo" disabled={!state.canUndo} onClick={() => editor.chain().focus().undo().run()} className={buttonClass(false)}>
				Undo
			</button>
			<button type="button" title="Redo" disabled={!state.canRedo} onClick={() => editor.chain().focus().redo().run()} className={buttonClass(false)}>
				Redo
			</button>
		</div>
	);
};

const RichTextEditor = ({ name, defaultValue, label }: Props) => {
	const [markdown, setMarkdown] = useState(defaultValue);

	const editor = useEditor({
		// Next render trên server trước, nên không dựng trình soạn thảo ngay để tránh lệch HTML khi hydrate
		immediatelyRender: false,
		extensions: [
			// Chỉ giữ các định dạng có cú pháp Markdown và site hiển thị được
			StarterKit.configure({
				heading: { levels: [2, 3] },
				link: { openOnClick: false, autolink: false },
				underline: false,
				strike: false,
				code: false,
				codeBlock: false,
				blockquote: false,
				horizontalRule: false,
			}),
			Markdown,
		],
		content: defaultValue,
		contentType: "markdown",
		onUpdate: ({ editor: e }) => setMarkdown(e.getMarkdown()),
		editorProps: {
			attributes: {
				"aria-label": label,
				role: "textbox",
				"aria-multiline": "true",
				class: "min-h-60 max-h-[600px] overflow-y-auto p-3 outline-none",
			},
		},
	});

	return (
		<div className="rich-text border border-[#8c8f94] bg-white focus-within:border-wp-accent focus-within:shadow-[0_0_0_1px_var(--color-wp-accent)]">
			{editor ? <Toolbar editor={editor} /> : <div className="h-9.5 border-b border-wp-border bg-[#f6f7f7]" aria-hidden />}
			<EditorContent editor={editor} />
			{/* Giá trị gửi đi theo form: nội dung dạng Markdown */}
			<input type="hidden" name={name} value={markdown} />
		</div>
	);
};

export default RichTextEditor;
