// Không có "use client": dùng chung cho NavLinks và bản fallback ở header
export const navLinkBase = "relative flex h-full items-center text-base font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:rounded-full after:bg-primary-500 after:transition-transform motion-reduce:transition-none";
export const navLinkActive = "text-primary-500 after:scale-x-100";
export const navLinkIdle = "text-gray-500 after:scale-x-0 hover:text-primary-500 hover:after:scale-x-100";
export const navListClass = "items-center gap-8 self-stretch";
