import "./Button.css";
import { Icon } from "../Icon/Icon";

export interface ButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  disabled?: boolean;
  iconOnly?: boolean;
  circle?: boolean;
  iconName?: string;
  onClick?: (event: MouseEvent) => void;
  className?: string;
  ariaLabel?: string;
  id?: string;
}

/**
 * Highly customizable and accessible Button component.
 */
export function Button({
  label = "",
  variant = "primary",
  disabled = false,
  iconOnly = false,
  circle = false,
  iconName,
  onClick,
  className = "",
  ariaLabel,
  id,
}: ButtonProps): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.type = "button";
  
  // Set identifier
  if (id) {
    btn.id = id;
  }
  
  // Apply classes
  let classList = `btn btn--${variant}`;
  if (iconOnly) classList += " btn--icon-only";
  if (circle) classList += " btn--circle";
  if (className) classList += ` ${className}`;
  btn.className = classList.trim();
  
  // Set disabled state
  btn.disabled = disabled;
  
  // Add interactive click listener
  if (onClick) {
    btn.addEventListener("click", onClick);
  }
  
  // Set accessibility label if needed
  if (ariaLabel) {
    btn.setAttribute("aria-label", ariaLabel);
  } else if (iconOnly && iconName) {
    btn.setAttribute("aria-label", label || iconName);
  }
  
  // Add icon if specified
  if (iconName) {
    const iconElement = Icon({ name: iconName as any, size: iconOnly ? 20 : 16 });
    btn.appendChild(iconElement);
  }
  
  // Add text label
  if (!iconOnly && label) {
    const labelSpan = document.createElement("span");
    labelSpan.textContent = label;
    btn.appendChild(labelSpan);
  }
  
  return btn;
}
