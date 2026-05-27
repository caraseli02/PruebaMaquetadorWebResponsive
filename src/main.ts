import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/responsive.css";
import "./styles/skeleton.css";
import "./components/organisms/Header/Header.css";
import "./components/organisms/Hero/Hero.css";
import "./components/organisms/SearchBar/SearchBar.css";
import "./components/organisms/Footer/Footer.css";

import fondoImage from "./assets/fondo.png";
import { createIcon, type IconName } from "./components/atoms/Icon";
import { createSliderIndicator } from "./components/atoms/SliderIndicator";
import { createFilterPanel } from "./components/organisms/FilterPanel/FilterPanel";
import { TravelFilterState } from "./components/organisms/FilterPanel/TravelFilterState";
import { createCardsGrid } from "./components/organisms/CardsGrid/CardsGrid";
import { createPricingPopover } from "./components/molecules/Popover";
import { createBookingDialog } from "./components/molecules/BookingDialog";
import { OverlayManager } from "./components/molecules/OverlayManager";
import type { CardData } from "./types";

type HeroSlide = {
  title: string;
  highlightedTitle?: string;
  description: string;
  imageSrc: string;
};

const heroSlides: HeroSlide[] = [
  {
    title: "Ruta por Australia",
    description: "Si te va la aventura, no te lo puedes perder",
    imageSrc: fondoImage,
  },
  {
    title: "Costa de",
    highlightedTitle: "Australia",
    description: "Si te va la aventura, este viaje te lleva directo al mapa.",
    imageSrc: fondoImage,
  },
  {
    title: "Aventura en",
    highlightedTitle: "Australia",
    description: "Naturaleza, carretera y grupo en una escapada lista para reservar.",
    imageSrc: fondoImage,
  },
];

const iconNames = new Set<IconName>([
  "chevronRight",
  "menu",
  "close",
  "heart",
  "landscape",
  "compass",
  "printer",
  "activity",
  "globe",
  "home",
  "chevronLeft",
  "triangleDown",
  "calendar",
  "users",
  "tag",
  "tagTilt",
  "chevronDown",
  "chevronDownCompact",
  "filter",
]);

const createSizedIcon = (name: IconName, size: number, className = ""): SVGSVGElement =>
  createIcon({ name, size, color: "currentColor", className });

const hydrateIcons = (root: ParentNode = document): void => {
  root.querySelectorAll<HTMLElement>("[data-icon]").forEach((slot) => {
    const name = slot.dataset.icon;
    if (!name || !iconNames.has(name as IconName)) return;

    const size = Number(slot.dataset.iconSize ?? 24);
    const icon = createSizedIcon(name as IconName, Number.isFinite(size) ? size : 24, slot.className);
    slot.replaceWith(icon);
  });
};

const bindHeader = (): void => {
  const toggleButton = document.querySelector<HTMLButtonElement>(".header__toggle");
  const mobileMenu = document.querySelector<HTMLElement>(".header__mobile-menu");
  if (!toggleButton || !mobileMenu) return;

  const setToggleIcon = (isOpen: boolean) => {
    toggleButton.replaceChildren(createSizedIcon(isOpen ? "close" : "menu", 24));
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("header__mobile-menu--open");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Abrir menú de navegación móvil");
    setToggleIcon(false);
  };

  toggleButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("header__mobile-menu--open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú de navegación móvil" : "Abrir menú de navegación móvil"
    );
    setToggleIcon(isOpen);
    if (isOpen) {
      // Focus the first link in the mobile menu for keyboard convenience
      const firstLink = mobileMenu.querySelector("a");
      firstLink?.focus();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("header__mobile-menu--open")) {
      closeMenu();
      toggleButton.focus();
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
};

const bindHero = (): void => {
  const section = document.querySelector<HTMLElement>("[data-hero]");
  const title = section?.querySelector<HTMLElement>(".hero__title");
  const description = section?.querySelector<HTMLElement>(".hero__desc");
  const sliderSlot = section?.querySelector<HTMLElement>(".hero__slider-slot");
  const prevButton = section?.querySelector<HTMLButtonElement>(".hero__slider-control--prev");
  const nextButton = section?.querySelector<HTMLButtonElement>(".hero__slider-control--next");
  if (!section || !title || !description || !sliderSlot || !prevButton || !nextButton) return;

  let activeIndex = 0;

  const renderSlide = () => {
    const slide = heroSlides[activeIndex];
    section.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.58)), url(${slide.imageSrc})`;

    title.textContent = slide.title;
    if (slide.highlightedTitle) {
      const highlighted = document.createElement("span");
      highlighted.textContent = slide.highlightedTitle;
      title.append(" ", highlighted);
    }

    description.textContent = slide.description;

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
    sliderSlot.replaceChildren(slider);
  };

  const goToSlide = (direction: 1 | -1) => {
    activeIndex = (activeIndex + direction + heroSlides.length) % heroSlides.length;
    renderSlide();
  };

  prevButton.addEventListener("click", () => goToSlide(-1));
  nextButton.addEventListener("click", () => goToSlide(1));

  renderSlide();
};

const bindSearchBar = (filterState: TravelFilterState): void => {
  const destinationField = document.querySelector<HTMLInputElement>("#search-destination");
  const searchButton = document.querySelector<HTMLButtonElement>(".search-bar__btn");
  if (!destinationField || !searchButton) return;

  filterState.subscribe((state) => {
    if (document.activeElement !== destinationField) {
      destinationField.value = state.search;
    }
  });

  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    filterState.setSearch(destinationField.value);
  });
};

const initApp = () => {
  hydrateIcons();
  bindHeader();
  bindHero();

  const filterState = new TravelFilterState();
  bindSearchBar(filterState);

  const overlayRoot = document.getElementById("app-overlays") ?? document.body;
  const inlineFiltersRoot = document.querySelector<HTMLElement>("[data-inline-filters]");
  const contentContainer = document.querySelector<HTMLElement>("[data-grid-content]");
  if (!inlineFiltersRoot || !contentContainer) return;

  let popover = createPricingPopover();
  popover.style.display = "none";
  popover.style.position = "absolute";
  overlayRoot.appendChild(popover);

  const showPricingPopover = (card: CardData, triggerEl: HTMLElement) => {
    const nextPopover = createPricingPopover({
      price: card.price,
      location: card.location,
      region: card.region,
      durationDays: card.durationDays,
      onClose: () => {
        OverlayManager.closePopover();
      },
    });

    popover.replaceWith(nextPopover);
    popover = nextPopover;

    OverlayManager.openPopover(popover, triggerEl);
  };

  const bookingDialog = createBookingDialog();
  overlayRoot.appendChild(bookingDialog.dialog);

  inlineFiltersRoot.replaceChildren(createFilterPanel({ filterState }));

  const dialogFilters = createFilterPanel({
    filterState,
    dialogMode: true,
    onCloseDialog: () => {
      OverlayManager.closeModal(dialogFilters);
    },
  }) as HTMLDialogElement;
  overlayRoot.appendChild(dialogFilters);

  document.querySelector<HTMLButtonElement>(".mobile-filter-trigger")?.addEventListener("click", () => {
    OverlayManager.openModal(dialogFilters);
  });

  filterState.subscribe((_state, filteredCards) => {
    const grid = createCardsGrid({
      cards: filteredCards,
      onDetailsClick: (card, event) => {
        showPricingPopover(card, event.currentTarget as HTMLElement);
      },
      onBookClick: (card) => {
        bookingDialog.show(card);
      },
    });

    contentContainer.replaceChildren(grid);
  });

  // Fade out and remove the global skeleton loader
  const skeletonEl = document.getElementById("global-page-skeleton");
  if (skeletonEl) {
    // Deliberate small timeout (300ms) to let the page settle visually and showcase the shimmer
    setTimeout(() => {
      skeletonEl.classList.add("global-skeleton-loader--fade-out");
      
      const removeLoader = () => {
        skeletonEl.remove();
      };
      
      skeletonEl.addEventListener("transitionend", removeLoader, { once: true });
      // Fallback removal after 600ms if transitionend doesn't fire
      setTimeout(removeLoader, 600);
    }, 300);
  }
};

window.addEventListener("DOMContentLoaded", initApp);
