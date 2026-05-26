import "./Hero.css";
import { createButton } from "../../atoms/Button";
import fondoImage from "../../../assets/fondo.png";

export interface HeroProps {
  titleHtml?: string;
  description?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

/**
 * Premium Hero banner organism utilizing fluid typography and the figma background asset.
 */
export function createHero({
  titleHtml = "Ruta por <span>Australia</span>",
  description = "Descubre los desiertos rojos, las costas vírgenes y las ciudades vibrantes del continente australiano. Un viaje inolvidable lleno de aventuras, naturaleza salvaje y experiencias únicas en grupo.",
  primaryCtaLabel = "Ver viaje",
  secondaryCtaLabel = "Saber Más",
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps = {}): HTMLElement {
  const section = document.createElement("section");
  section.className = "hero";
  section.style.backgroundImage = `linear-gradient(to right, rgba(25, 10, 49, 0.85) 0%, rgba(25, 10, 49, 0.4) 100%), url(${fondoImage})`;
  
  const container = document.createElement("div");
  container.className = "hero__container container";
  
  const content = document.createElement("div");
  content.className = "hero__content";
  
  // Title
  const title = document.createElement("h1");
  title.className = "hero__title";
  title.innerHTML = titleHtml;
  content.appendChild(title);
  
  // Description
  const desc = document.createElement("p");
  desc.className = "hero__desc";
  desc.textContent = description;
  content.appendChild(desc);
  
  // CTA Action buttons
  const actions = document.createElement("div");
  actions.className = "hero__actions";
  
  const primaryBtn = createButton({
    label: primaryCtaLabel,
    variant: "orange",
    size: "lg",
  });
  if (onPrimaryClick) {
    primaryBtn.addEventListener("click", onPrimaryClick);
  }
  
  const secondaryBtn = createButton({
    label: secondaryCtaLabel,
    variant: "outline",
    size: "lg",
  });
  // Apply premium adjustments for outline button over dark backdrop
  secondaryBtn.classList.add("hero__btn-secondary");
  if (onSecondaryClick) {
    secondaryBtn.addEventListener("click", onSecondaryClick);
  }
  
  actions.appendChild(primaryBtn);
  actions.appendChild(secondaryBtn);
  content.appendChild(actions);
  
  container.appendChild(content);
  section.appendChild(container);
  
  return section;
}
