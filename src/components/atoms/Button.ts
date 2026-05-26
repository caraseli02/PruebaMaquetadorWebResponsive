export type ButtonVariant = "plum" | "orange" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonOptions = {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export const createButton = ({
  label = "Button",
  variant = "plum",
  size = "md",
  disabled = false,
  type = "button",
}: ButtonOptions = {}): HTMLButtonElement => {
  const button = document.createElement("button");
  button.className = `dux-button dux-button--${variant} dux-button--${size}`;
  button.type = type;
  button.disabled = disabled;
  button.textContent = label;
  return button;
};
