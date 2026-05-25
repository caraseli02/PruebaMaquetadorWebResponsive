import "./Tabs.css";
import { Icon } from "../Icon/Icon";

export interface TabItem {
  id: string;
  label: string;
  iconName?: string;
  active?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  variant?: "underline" | "pill";
  onTabChange?: (tabId: string) => void;
  className?: string;
}

/**
 * Responsive Segmented Tabs atom supporting outline and pill formats.
 */
export function Tabs({
  items = [],
  variant = "underline",
  onTabChange,
  className = "",
}: TabsProps): HTMLElement {
  const tabsList = document.createElement("ul");
  tabsList.className = `tabs tabs--${variant} ${className}`.trim();
  tabsList.setAttribute("role", "tablist");
  
  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = `tabs__item ${item.active ? "tabs__item--active" : ""}`.trim();
    li.setAttribute("role", "tab");
    li.setAttribute("aria-selected", item.active ? "true" : "false");
    li.setAttribute("tabindex", item.active ? "0" : "-1");
    
    // Add icon if specified
    if (item.iconName) {
      const iconEl = Icon({ name: item.iconName as any, size: 16 });
      li.appendChild(iconEl);
    }
    
    const labelSpan = document.createElement("span");
    labelSpan.textContent = item.label;
    li.appendChild(labelSpan);
    
    // Interactive tabs toggles
    li.addEventListener("click", () => {
      // Clear active siblings
      const siblings = tabsList.querySelectorAll(".tabs__item");
      siblings.forEach((el) => {
        el.classList.remove("tabs__item--active");
        el.setAttribute("aria-selected", "false");
        el.setAttribute("tabindex", "-1");
      });
      
      // Activate clicked
      li.classList.add("tabs__item--active");
      li.setAttribute("aria-selected", "true");
      li.setAttribute("tabindex", "0");
      
      if (onTabChange) {
        onTabChange(item.id);
      }
    });
    
    tabsList.appendChild(li);
  });
  
  return tabsList;
}
