import { createIcon, type IconName } from "./Icon";
import { uniqueId } from "./html";

export type TextInputVariant = "neutral" | "dark" | "accent";

export type TextInputOptions = {
  label?: string;
  value?: string;
  placeholder?: string;
  icon?: IconName;
  hasChevron?: boolean;
  variant?: TextInputVariant;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
};

export const createTextInput = ({
  label = "Entrada",
  value = "",
  placeholder = "Escribe aquí...",
  icon = "compass",
  hasChevron = false,
  variant = "neutral",
  disabled = false,
  invalid = false,
  id = uniqueId("text-input"),
}: TextInputOptions = {}): HTMLElement => {
  const wrapper = document.createElement("label");
  wrapper.className = `dux-text-input dux-text-input--${variant}${disabled ? " dux-text-input--disabled" : ""}${invalid ? " dux-text-input--invalid" : ""}`;
  wrapper.htmlFor = id;

  const labelElement = document.createElement("span");
  labelElement.className = "dux-text-input__label";
  labelElement.textContent = label;

  const control = document.createElement("span");
  control.className = "dux-text-input__control";
  control.append(createIcon({ name: icon, size: 24, color: "currentColor" }));

  const content = document.createElement("span");
  content.className = "dux-text-input__content";

  const input = document.createElement("input");
  input.className = "dux-text-input__field";
  input.id = id;
  input.type = "text";
  input.placeholder = placeholder;
  input.value = value;
  input.disabled = disabled;
  input.setAttribute("aria-invalid", String(invalid));
  content.append(labelElement, input);
  control.append(content);

  if (hasChevron) {
    control.append(createIcon({ name: "chevronDownCompact", size: 16, className: "dux-text-input__chevron" }));
  }

  wrapper.append(control);
  return wrapper;
};
