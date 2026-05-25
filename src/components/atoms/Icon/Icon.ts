import { icons } from "./icons";
import type { IconName } from "./icons";

export interface IconProps {
  name: IconName;
  className?: string;
  color?: string;
  size?: number;
}

/**
 * Accessible, styled SVG Icon component.
 */
export function Icon({ name, className = "", color, size }: IconProps): HTMLElement {
  const container = document.createElement("span");
  container.className = `icon icon--${name} ${className}`.trim();
  container.setAttribute("aria-hidden", "true");
  
  const rawSvg = icons[name] || "";
  container.innerHTML = rawSvg.trim();
  
  const svgElement = container.querySelector("svg");
  if (svgElement) {
    if (size) {
      svgElement.setAttribute("width", size.toString());
      svgElement.setAttribute("height", size.toString());
    }
    if (color) {
      svgElement.style.color = color;
    }
  }
  
  return container;
}
