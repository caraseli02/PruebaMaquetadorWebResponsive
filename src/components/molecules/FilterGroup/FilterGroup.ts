import "./FilterGroup.css";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";

export interface FilterGroupProps {
  title: string;
  items: Array<{
    label: string;
    checked?: boolean;
    value?: string;
  }>;
  onChange?: (checkedValues: string[]) => void;
  layout?: "column" | "row";
  className?: string;
}

/**
 * Filter Group molecule to bundle multiple checkboxes under a styled title header.
 */
export function FilterGroup({
  title,
  items = [],
  onChange,
  layout = "column",
  className = "",
}: FilterGroupProps): HTMLElement {
  const group = document.createElement("div");
  group.className = `filter-group ${className}`.trim();
  
  const header = document.createElement("h4");
  header.className = "filter-group__title";
  header.textContent = title;
  group.appendChild(header);
  
  const list = document.createElement("div");
  list.className = `filter-group__list filter-group__list--${layout}`;
  
  const selectedValues: string[] = [];
  
  // Track check state internally
  items.forEach((item) => {
    const val = item.value || item.label;
    if (item.checked) {
      selectedValues.push(val);
    }
    
    const checkboxElement = Checkbox({
      label: item.label,
      checked: item.checked,
      value: val,
      onChange: (checked) => {
        const itemVal = val;
        if (checked) {
          if (!selectedValues.includes(itemVal)) {
            selectedValues.push(itemVal);
          }
        } else {
          const idx = selectedValues.indexOf(itemVal);
          if (idx > -1) {
            selectedValues.splice(idx, 1);
          }
        }
        
        if (onChange) {
          onChange([...selectedValues]);
        }
      },
    });
    
    list.appendChild(checkboxElement);
  });
  
  group.appendChild(list);
  
  return group;
}
