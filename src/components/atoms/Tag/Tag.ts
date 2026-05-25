import "./Tag.css";

export interface TagProps {
  label: string;
  variant?: "primary" | "secondary" | "featured" | "outline";
  round?: boolean;
  className?: string;
}

/**
 * Clean, metadata Tag/Badge atom.
 */
export function Tag({
  label,
  variant = "primary",
  round = false,
  className = "",
}: TagProps): HTMLElement {
  const span = document.createElement("span");
  
  let classList = `tag tag--${variant}`;
  if (round) classList += " tag--round";
  if (className) classList += ` ${className}`;
  span.className = classList.trim();
  
  span.textContent = label;
  
  return span;
}
