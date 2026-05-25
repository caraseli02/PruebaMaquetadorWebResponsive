import "./Card.css";
import { Icon } from "../../atoms/Icon/Icon";

export interface CardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  rating?: number;
  isFeatured?: boolean;
  onClick?: () => void;
}

/**
 * Responsive, elastic Card component utilizing Container Queries.
 */
export function Card({
  id,
  title,
  description,
  imageUrl,
  tags = [],
  rating,
  isFeatured = false,
  onClick,
}: CardProps): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "card-wrapper";
  wrapper.setAttribute("data-id", id);
  
  const card = document.createElement("article");
  card.className = "card";
  if (onClick) {
    card.style.cursor = "pointer";
    card.addEventListener("click", onClick);
  }
  
  // Image container
  const imgContainer = document.createElement("div");
  imgContainer.className = "card__image-container";
  
  const img = document.createElement("img");
  img.className = "card__image";
  img.src = imageUrl;
  img.alt = `Imagen de presentación para ${title}`;
  img.loading = "lazy";
  imgContainer.appendChild(img);
  
  // Optional Featured Badge (e.g. "Destacado")
  if (isFeatured) {
    const badge = document.createElement("span");
    badge.className = "card__badge";
    badge.textContent = "Destacado";
    imgContainer.appendChild(badge);
  }
  
  card.appendChild(imgContainer);
  
  // Content container
  const content = document.createElement("div");
  content.className = "card__content";
  
  // Tags
  if (tags.length > 0) {
    const tagsWrapper = document.createElement("div");
    tagsWrapper.className = "card__tags";
    tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.className = "card__tag";
      tagSpan.textContent = tag;
      tagsWrapper.appendChild(tagSpan);
    });
    content.appendChild(tagsWrapper);
  }
  
  // Title
  const heading = document.createElement("h3");
  heading.className = "card__title";
  heading.textContent = title;
  content.appendChild(heading);
  
  // Description
  const desc = document.createElement("p");
  desc.className = "card__desc";
  desc.textContent = description;
  content.appendChild(desc);
  
  // Footer (Rating & More action link)
  const footer = document.createElement("div");
  footer.className = "card__footer";
  
  // Star rating
  const ratingWrapper = document.createElement("div");
  ratingWrapper.className = "card__rating";
  if (rating !== undefined) {
    const starElement = Icon({ name: "star", size: 14 });
    ratingWrapper.appendChild(starElement);
    
    const scoreSpan = document.createElement("span");
    scoreSpan.textContent = rating.toFixed(1);
    ratingWrapper.appendChild(scoreSpan);
    
    const countSpan = document.createElement("span");
    countSpan.className = "card__rating-text";
    countSpan.textContent = "(4.8)";
    ratingWrapper.appendChild(countSpan);
  } else {
    ratingWrapper.style.visibility = "hidden";
  }
  footer.appendChild(ratingWrapper);
  
  // More action link
  const moreLink = document.createElement("span");
  moreLink.className = "card__more-btn";
  moreLink.textContent = "Ver más";
  const chevron = Icon({ name: "chevron-down", size: 14 });
  chevron.style.transform = "rotate(-90deg)"; // Make it point right
  moreLink.appendChild(chevron);
  footer.appendChild(moreLink);
  
  content.appendChild(footer);
  card.appendChild(content);
  wrapper.appendChild(card);
  
  return wrapper;
}
