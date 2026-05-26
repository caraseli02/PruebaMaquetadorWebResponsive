export type TagVariant = "filled" | "soft";

export type TagOptions = {
  label?: string;
  variant?: TagVariant;
};

export const createTag = ({ label = "Quads", variant = "filled" }: TagOptions = {}): HTMLElement => {
  const tag = document.createElement("span");
  tag.className = `dux-tag dux-tag--${variant}`;
  tag.textContent = label;
  return tag;
};
