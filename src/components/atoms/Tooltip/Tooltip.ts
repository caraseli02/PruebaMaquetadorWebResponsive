import "./Tooltip.css";
import { Icon } from "../Icon/Icon";

export interface TooltipProps {
  text: string;
  triggerLabel?: string;
  triggerIcon?: string;
  cardMode?: boolean;
  cardTitle?: string;
  cardRows?: Array<{ label: string; value: string; isTotal?: boolean }>;
}

/**
 * Highly interactive and accessible Tooltip and Pricing Breakdown Card atom.
 */
export function Tooltip({
  text,
  triggerLabel = "Info",
  triggerIcon = "info",
  cardMode = false,
  cardTitle = "Desglose de precios",
  cardRows = [],
}: TooltipProps): HTMLElement {
  const container = document.createElement("div");
  container.className = "tooltip-container";
  
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "tooltip-trigger";
  
  if (triggerIcon) {
    const iconEl = Icon({ name: triggerIcon as any, size: 14 });
    trigger.appendChild(iconEl);
  }
  
  const labelSpan = document.createElement("span");
  labelSpan.textContent = triggerLabel;
  trigger.appendChild(labelSpan);
  container.appendChild(trigger);
  
  // Standard Hover Bubble Mode
  if (!cardMode) {
    const bubble = document.createElement("span");
    bubble.className = "tooltip-bubble";
    bubble.setAttribute("role", "tooltip");
    bubble.textContent = text;
    container.appendChild(bubble);
    
    // Accessibility triggers
    trigger.setAttribute("aria-describedby", "tooltip-id");
    bubble.id = "tooltip-id";
    return container;
  }
  
  // Clickable Pricing Breakdown Card Mode
  let activeCard: HTMLElement | null = null;
  
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    
    if (activeCard) {
      activeCard.remove();
      activeCard = null;
      return;
    }
    
    const card = document.createElement("div");
    card.className = "tooltip-card";
    
    const header = document.createElement("div");
    header.className = "tooltip-card__header";
    
    const title = document.createElement("h4");
    title.className = "tooltip-card__title";
    title.textContent = cardTitle;
    header.appendChild(title);
    
    const closeBtn = document.createElement("button");
    closeBtn.className = "tooltip-card__close";
    closeBtn.type = "button";
    closeBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `.trim();
    closeBtn.addEventListener("click", (e2) => {
      e2.stopPropagation();
      card.remove();
      activeCard = null;
    });
    header.appendChild(closeBtn);
    card.appendChild(header);
    
    // Content rows
    const list = document.createElement("div");
    list.className = "tooltip-card__list";
    
    cardRows.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = `tooltip-card__row ${row.isTotal ? "tooltip-card__row--total" : ""}`.trim();
      
      const label = document.createElement("span");
      label.textContent = row.label;
      rowDiv.appendChild(label);
      
      const val = document.createElement("span");
      val.textContent = row.value;
      rowDiv.appendChild(val);
      
      list.appendChild(rowDiv);
    });
    
    card.appendChild(list);
    container.appendChild(card);
    activeCard = card;
    
    // Close card when clicking outside
    const clickOutsideListener = () => {
      card.remove();
      activeCard = null;
      document.removeEventListener("click", clickOutsideListener);
    };
    document.addEventListener("click", clickOutsideListener);
  });
  
  return container;
}
