import "./Hero.css";
import { createButton } from "../../atoms/Button";
import { createIcon } from "../../atoms/Icon";
import { createSliderIndicator } from "../../atoms/SliderIndicator";
import fondoImage from "../../../assets/fondo.png";

export interface HeroSlide {
  titleHtml: string;
  description: string;
  imageSrc?: string;
}

export interface HeroProps {
  titleHtml?: string;
  description?: string;
  slides?: HeroSlide[];
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

/**
 * Premium Hero banner organism utilizing fluid typography and the figma background asset.
 */
export function createHero({
  titleHtml = "Ruta por Australia",
  description = "Si te va la aventura, no te lo puedes perder",
  slides,
  primaryCtaLabel = "Más información",
  secondaryCtaLabel,
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps = {}): HTMLElement {
  const heroSlides = slides?.length
    ? slides
    : [
        { titleHtml, description, imageSrc: fondoImage },
        {
          titleHtml: "Costa de <span>Australia</span>",
          description: "Si te va la aventura, este viaje te lleva directo al mapa.",
          imageSrc: fondoImage,
        },
        {
          titleHtml: "Aventura en <span>Australia</span>",
          description: "Naturaleza, carretera y grupo en una escapada lista para reservar.",
          imageSrc: fondoImage,
        },
      ];
  let activeIndex = 0;

  const section = document.createElement("section");
  section.className = "hero";
  
  const container = document.createElement("div");
  container.className = "hero__container container";
  
  const content = document.createElement("div");
  content.className = "hero__content";
  
  // Title
  const title = document.createElement("h1");
  title.className = "hero__title";
  content.appendChild(title);
  
  // Description
  const desc = document.createElement("p");
  desc.className = "hero__desc";
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
  
  actions.appendChild(primaryBtn);

  if (secondaryCtaLabel) {
    const secondaryBtn = createButton({
      label: secondaryCtaLabel,
      variant: "outline",
      size: "lg",
    });
    secondaryBtn.classList.add("hero__btn-secondary");
    if (onSecondaryClick) {
      secondaryBtn.addEventListener("click", onSecondaryClick);
    }
    actions.appendChild(secondaryBtn);
  }

  content.appendChild(actions);

  const sliderSlot = document.createElement("div");
  sliderSlot.className = "hero__slider-slot";
  content.appendChild(sliderSlot);

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.className = "hero__slider-control hero__slider-control--prev";
  prevButton.setAttribute("aria-label", "Ver aventura anterior");
  prevButton.appendChild(createIcon({ name: "chevronLeft", size: 24, color: "currentColor" }));

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "hero__slider-control hero__slider-control--next";
  nextButton.setAttribute("aria-label", "Ver siguiente aventura");
  nextButton.appendChild(createIcon({ name: "chevronRight", size: 24, color: "currentColor" }));

  const renderSlide = () => {
    const activeSlide = heroSlides[activeIndex];
    section.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.58)), url(${activeSlide.imageSrc ?? fondoImage})`;
    title.innerHTML = activeSlide.titleHtml;
    desc.textContent = activeSlide.description;

    sliderSlot.replaceChildren();
    const slider = createSliderIndicator({
      total: heroSlides.length,
      activeIndex,
      label: "Aventuras destacadas",
      onDotClick: (index) => {
        activeIndex = index;
        renderSlide();
      },
    });
    slider.classList.add("hero__slider");
    sliderSlot.appendChild(slider);
  };

  const goToSlide = (direction: 1 | -1) => {
    activeIndex = (activeIndex + direction + heroSlides.length) % heroSlides.length;
    renderSlide();
  };

  prevButton.addEventListener("click", () => goToSlide(-1));
  nextButton.addEventListener("click", () => goToSlide(1));
  
  container.appendChild(content);
  section.appendChild(container);
  if (heroSlides.length > 1) {
    section.append(prevButton, nextButton);
  }
  renderSlide();
  
  return section;
}
