import "./TextInput.css";
import { Icon } from "../Icon/Icon";

export interface TextInputProps {
  placeholder?: string;
  value?: string;
  iconName?: string;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

/**
 * Text Input atom with optional integrated SVG Icon.
 */
export function TextInput({
  placeholder = "",
  value = "",
  iconName,
  onChange,
  className = "",
  id,
  ariaLabel,
}: TextInputProps): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = `input-wrapper ${className}`.trim();
  if (iconName) {
    wrapper.classList.add("input-wrapper--has-icon");
  }
  
  const input = document.createElement("input");
  input.type = "text";
  input.className = "input-field";
  input.placeholder = placeholder;
  input.value = value;
  
  if (id) {
    input.id = id;
  }
  
  if (ariaLabel) {
    input.setAttribute("aria-label", ariaLabel);
  }
  
  // Attach change listener
  if (onChange) {
    input.addEventListener("input", (e) => {
      onChange((e.target as HTMLInputElement).value);
    });
  }
  
  wrapper.appendChild(input);
  
  // Add icon if specified
  if (iconName) {
    const iconSpan = document.createElement("span");
    iconSpan.className = "input-icon";
    const iconElement = Icon({ name: iconName as any, size: 18 });
    iconSpan.appendChild(iconElement);
    wrapper.appendChild(iconSpan);
  }
  
  return wrapper;
}
