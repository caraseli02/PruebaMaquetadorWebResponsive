import "./CardsGrid.css";
import { createCircuitCardGridTitle } from "../../atoms/CircuitCardGridTitle";
import { createCircuitCard } from "../../molecules/CircuitCard";
import { createIcon } from "../../atoms/Icon";
import type { CardData } from "../../../types";

export interface CardsGridProps {
  cards?: CardData[];
  title?: string;
  onCardClick?: (id: string) => void;
  onDetailsClick?: (card: CardData, event: MouseEvent) => void;
  onBookClick?: (card: CardData, event: MouseEvent) => void;
}

/**
 * Grid organism that maps, binds, and dynamically renders flexible Card components.
 */
export function createCardsGrid({
  cards = [],
  title = "Asia",
  onCardClick,
  onDetailsClick,
  onBookClick,
}: CardsGridProps = {}): HTMLElement {
  const container = document.createElement("div");
  container.className = "cards-grid-container";
  container.id = "cards-grid-container-el";
  container.setAttribute("aria-live", "polite");
  
  // Empty State Rendering
  if (cards.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "cards-grid--empty";
    
    const iconWrapper = document.createElement("div");
    iconWrapper.className = "cards-grid__empty-icon";
    iconWrapper.appendChild(createIcon({ name: "compass", size: 48, color: "var(--color-orange-500)" }));
    emptyState.appendChild(iconWrapper);
    
    const titleEl = document.createElement("h4");
    titleEl.className = "cards-grid__empty-title";
    titleEl.textContent = "No se encontraron viajes";
    emptyState.appendChild(titleEl);
    
    const desc = document.createElement("p");
    desc.className = "cards-grid__empty-desc";
    desc.textContent = "Prueba a cambiar tus criterios de búsqueda o limpia los filtros activos.";
    emptyState.appendChild(desc);
    
    container.appendChild(emptyState);
    return container;
  }
  
  // Reusable Grid elements mapping
  container.appendChild(createCircuitCardGridTitle({ text: title }));

  const grid = document.createElement("div");
  grid.className = "cards-grid";
  grid.setAttribute("role", "list");
  
  cards.forEach((cardData, index) => {
    const cardItem = document.createElement("div");
    cardItem.setAttribute("role", "listitem");
    
    const cardEl = createCircuitCard({
      imageSrc: cardData.imageUrl,
      imageAlt: cardData.imageAlt,
      tag: cardData.tag,
      location: cardData.location,
      region: cardData.region,
      durationDays: cardData.durationDays,
      title: cardData.title,
      loading: index < 3 ? "eager" : "lazy",
      fetchpriority: index === 0 ? "high" : "auto",
      bottomBar: {
        price: cardData.price,
        onDetailsClick: (e) => {
          if (onDetailsClick) onDetailsClick(cardData, e);
        },
        onBookClick: (e) => {
          if (onBookClick) onBookClick(cardData, e);
        }
      }
    });
    
    if (onCardClick) {
      cardEl.addEventListener("click", () => onCardClick(cardData.id));
    }
    
    cardItem.appendChild(cardEl);
    grid.appendChild(cardItem);
  });
  
  container.appendChild(grid);
  
  return container;
}
