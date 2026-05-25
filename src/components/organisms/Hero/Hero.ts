import "./Hero.css";
import { Button } from "../../atoms/Button/Button";

export interface HeroProps {
  titleHtml?: string;
  description?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  illustrationSrc?: string;
}

/**
 * High-impact, responsive Hero banner organism utilizing fluid typography and gradients.
 */
export function Hero({
  titleHtml = "Domina el desarrollo con <span>diseño fluido</span> y accesible",
  description = "Aprende a maquetar sitios web modernos usando CSS Grid, Flexbox, y Container Queries. Crea interfaces accesibles que cautivan a tus usuarios y se adaptan a cualquier pantalla de forma nativa.",
  primaryCtaLabel = "Explorar Cursos",
  secondaryCtaLabel = "Saber Más",
  onPrimaryClick,
  onSecondaryClick,
  illustrationSrc,
}: HeroProps = {}): HTMLElement {
  const section = document.createElement("section");
  section.className = "hero";
  
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
  
  const primaryBtn = Button({
    label: primaryCtaLabel,
    variant: "primary",
    onClick: onPrimaryClick ? () => onPrimaryClick() : undefined,
  });
  
  const secondaryBtn = Button({
    label: secondaryCtaLabel,
    variant: "outline",
    className: "btn--hero-secondary",
    onClick: onSecondaryClick ? () => onSecondaryClick() : undefined,
  });
  // Adjust border color override for outline inside dark background
  secondaryBtn.style.color = "var(--color-text-light)";
  secondaryBtn.style.borderColor = "var(--color-purple-400)";
  secondaryBtn.addEventListener("mouseenter", () => {
    secondaryBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    secondaryBtn.style.borderColor = "var(--color-primary)";
    secondaryBtn.style.color = "var(--color-primary)";
  });
  secondaryBtn.addEventListener("mouseleave", () => {
    secondaryBtn.style.backgroundColor = "transparent";
    secondaryBtn.style.borderColor = "var(--color-purple-400)";
    secondaryBtn.style.color = "var(--color-text-light)";
  });
  
  actions.appendChild(primaryBtn);
  actions.appendChild(secondaryBtn);
  content.appendChild(actions);
  
  container.appendChild(content);
  
  // Optional Visual Illustration
  if (illustrationSrc) {
    const illusWrapper = document.createElement("div");
    illusWrapper.className = "hero__illustration";
    illusWrapper.style.display = "flex";
    illusWrapper.style.justifyContent = "center";
    
    const illusImg = document.createElement("img");
    illusImg.src = illustrationSrc;
    illusImg.alt = "Ilustración de interfaz fluida";
    illusImg.style.maxWidth = "100%";
    illusImg.style.height = "auto";
    illusImg.style.maxHeight = "360px";
    
    illusWrapper.appendChild(illusImg);
    container.appendChild(illusWrapper);
  } else {
    // Inject a clean visual placeholder illustration inside desktop view
    const illusWrapper = document.createElement("div");
    illusWrapper.className = "hero__illustration";
    illusWrapper.innerHTML = `
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">
        <rect x="20" y="20" width="360" height="260" rx="16" fill="white" fill-opacity="0.05" stroke="white" stroke-opacity="0.1" stroke-width="2"/>
        <rect x="40" y="40" width="120" height="40" rx="8" fill="var(--color-primary)" fill-opacity="0.8"/>
        <circle cx="340" cy="60" r="16" fill="var(--color-purple-400)"/>
        <rect x="40" y="100" width="320" height="12" rx="6" fill="white" fill-opacity="0.2"/>
        <rect x="40" y="124" width="260" height="12" rx="6" fill="white" fill-opacity="0.2"/>
        <rect x="40" y="148" width="300" height="12" rx="6" fill="white" fill-opacity="0.2"/>
        <rect x="40" y="180" width="140" height="80" rx="12" fill="white" fill-opacity="0.08" stroke="white" stroke-opacity="0.1" stroke-width="1.5"/>
        <rect x="200" y="180" width="160" height="80" rx="12" fill="white" fill-opacity="0.08" stroke="white" stroke-opacity="0.1" stroke-width="1.5"/>
      </svg>
    `.trim();
    illusWrapper.style.display = "flex";
    illusWrapper.style.justifyContent = "center";
    container.appendChild(illusWrapper);
  }
  
  section.appendChild(container);
  
  return section;
}
