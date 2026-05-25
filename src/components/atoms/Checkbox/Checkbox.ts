import "./Checkbox.css";

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
}

/**
 * Highly accessible and custom-styled Checkbox component.
 */
export function Checkbox({
  label,
  checked = false,
  onChange,
  id,
  name,
  value = "",
  className = "",
}: CheckboxProps): HTMLElement {
  const container = document.createElement("label");
  container.className = `checkbox-container ${className}`.trim();
  
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "checkbox-input";
  input.checked = checked;
  input.id = checkboxId;
  if (name) input.name = name;
  if (value) input.value = value;
  
  // Custom styled checkbox box
  const box = document.createElement("span");
  box.className = "checkbox-box";
  // Insert check SVG icon inside box
  box.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `.trim();
  
  const text = document.createElement("span");
  text.className = "checkbox-label";
  text.textContent = label;
  
  // Interactive click triggers change
  if (onChange) {
    input.addEventListener("change", (e) => {
      onChange((e.target as HTMLInputElement).checked);
    });
  }
  
  container.appendChild(input);
  container.appendChild(box);
  container.appendChild(text);
  
  return container;
}
