import "./CardsGrid.css";
import { Card } from "../../molecules/Card/Card";
import type { CardProps } from "../../molecules/Card/Card";
import { Icon } from "../../atoms/Icon/Icon";

export interface CardsGridProps {
  cards?: CardProps[];
  onCardClick?: (id: string) => void;
}

/**
 * Grid organism that maps, binds, and dynamically renders flexible Card components.
 */
export function CardsGrid({
  cards = [],
  onCardClick,
}: CardsGridProps = {}): HTMLElement {
  const container = document.createElement("div");
  container.className = "cards-grid-container";
  container.id = "cards-grid-container-el";
  
  // Header with result counter
  const header = document.createElement("div");
  header.className = "cards-grid__header";
  
  const count = document.createElement("span");
  count.className = "cards-grid__count";
  count.innerHTML = `Mostrando <strong>${cards.length}</strong> curso${cards.length !== 1 ? "s" : ""}`;
  header.appendChild(count);
  container.appendChild(header);
  
  // Empty State Rendering
  if (cards.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "cards-grid--empty";
    
    const iconWrapper = document.createElement("div");
    iconWrapper.className = "cards-grid__empty-icon";
    const infoIcon = Icon({ name: "search", size: 48 });
    iconWrapper.appendChild(infoIcon);
    emptyState.appendChild(iconWrapper);
    
    const title = document.createElement("h4");
    title.className = "cards-grid__empty-title";
    title.textContent = "No se encontraron cursos";
    emptyState.appendChild(title);
    
    const desc = document.createElement("p");
    desc.className = "cards-grid__empty-desc";
    desc.textContent = "Prueba a cambiar tus criterios de búsqueda o limpia los filtros activos.";
    emptyState.appendChild(desc);
    
    container.appendChild(emptyState);
    return container;
  }
  
  // Reusable Grid elements mapping
  const grid = document.createElement("div");
  grid.className = "cards-grid";
  grid.setAttribute("role", "list");
  
  cards.forEach((cardData) => {
    const cardItem = document.createElement("div");
    cardItem.setAttribute("role", "listitem");
    
    const cardEl = Card({
      ...cardData,
      onClick: onCardClick ? () => onCardClick(cardData.id) : undefined,
    });
    
    cardItem.appendChild(cardEl);
    grid.appendChild(cardItem);
  });
  
  container.appendChild(grid);
  
  return container;
}
