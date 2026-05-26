import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/responsive.css";

import { createHeader } from "./components/organisms/Header/Header";
import { createHero } from "./components/organisms/Hero/Hero";
import { createSearchBar } from "./components/organisms/SearchBar/SearchBar";
import { createFilterPanel } from "./components/organisms/FilterPanel/FilterPanel";
import type { FilterState } from "./components/organisms/FilterPanel/FilterPanel";
import { createCardsGrid } from "./components/organisms/CardsGrid/CardsGrid";
import { createFooter } from "./components/organisms/Footer/Footer";
import { createButton } from "./components/atoms/Button";
import { createIcon } from "./components/atoms/Icon";
import { createPricingPopover } from "./components/molecules/Popover";
import { mockCards } from "./data/cards";
import type { CardData } from "./types";

/**
 * Main application coordinator and reactive state manager.
 */
function initApp() {
  const app = document.getElementById("app");
  if (!app) return;
  
  // Clear base container
  app.innerHTML = "";
  
  // Initial state representing travel criteria
  let currentFilters: FilterState = {
    search: "",
    destinations: [],
    activities: [],
    maxPrice: 700,
    ratings: [],
  };
  
  // ==========================================================================
  // PRICING POPOVER & CHECKOUT DIALOG INITIALIZATION
  // ==========================================================================
  
  // 0.1. Pricing Popover floating container
  let popover = createPricingPopover();
  popover.style.display = "none";
  popover.style.position = "absolute";
  document.body.appendChild(popover);
  
  function showPricingPopover(card: CardData, triggerEl: HTMLElement) {
    const nextPopover = createPricingPopover({
      price: card.price,
      onClose: () => {
        popover.style.display = "none";
      },
    });
    nextPopover.style.position = "absolute";
    popover.replaceWith(nextPopover);
    popover = nextPopover;
    popover.style.display = "block";
    
    // Position popover relative to the trigger element
    const rect = triggerEl.getBoundingClientRect();
    popover.style.top = `${rect.bottom + window.scrollY + 8}px`;
    popover.style.left = `${Math.min(rect.left + window.scrollX, window.innerWidth - 300)}px`;
    
    // Close on outside click
    const outsideClick = (e: MouseEvent) => {
      if (!popover.contains(e.target as Node) && !triggerEl.contains(e.target as Node)) {
        popover.style.display = "none";
        document.removeEventListener("click", outsideClick);
      }
    };
    setTimeout(() => document.addEventListener("click", outsideClick), 0);
  }
  
  // 0.2. Booking modal Dialog
  const bookingDialog = document.createElement("dialog");
  bookingDialog.className = "booking-dialog";
  document.body.appendChild(bookingDialog);
  
  function showBookingModal(card: CardData) {
    bookingDialog.innerHTML = `
      <div class="booking-dialog__content">
        <div class="booking-dialog__header">
          <h3 class="booking-dialog__title">Reserva tu Aventura</h3>
          <button class="booking-dialog__close" aria-label="Cerrar modal">×</button>
        </div>
        <div class="booking-dialog__body">
          <div class="booking-dialog__summary">
            <h4>${card.title}</h4>
            <p>${card.meta.replace(/<[^>]*>/g, "")}</p>
            <p class="booking-dialog__price">Precio por persona: <strong>${card.price}</strong></p>
          </div>
          <form class="booking-dialog__form">
            <div class="booking-form-field">
              <label for="booking-name">Nombre completo</label>
              <input type="text" id="booking-name" required placeholder="Tu nombre..." class="booking-input" />
            </div>
            <div class="booking-form-field">
              <label for="booking-email">Correo electrónico</label>
              <input type="email" id="booking-email" required placeholder="Tu correo..." class="booking-input" />
            </div>
            <div class="booking-form-field">
              <label for="booking-phone">Teléfono de contacto</label>
              <input type="tel" id="booking-phone" required placeholder="Tu teléfono..." class="booking-input" />
            </div>
            <div class="booking-actions">
              <button type="submit" class="dux-button dux-button--orange dux-button--lg booking-submit-btn">Confirmar Reserva</button>
              <button type="button" class="dux-button dux-button--outline dux-button--lg booking-cancel-btn">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    `;
    bookingDialog.showModal();
    document.body.classList.add("no-scroll");
    
    // Close triggers
    const closeBtn = bookingDialog.querySelector(".booking-dialog__close");
    const cancelBtn = bookingDialog.querySelector(".booking-cancel-btn");
    const form = bookingDialog.querySelector(".booking-dialog__form") as HTMLFormElement;
    
    const closeModal = () => {
      bookingDialog.close();
      document.body.classList.remove("no-scroll");
    };
    
    closeBtn?.addEventListener("click", closeModal);
    cancelBtn?.addEventListener("click", closeModal);
    bookingDialog.addEventListener("close", () => {
      document.body.classList.remove("no-scroll");
    });
    
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(`¡Reserva confirmada con éxito para "${card.title}"! Nos pondremos en contacto contigo en breve.`);
      closeModal();
    });
  }
  
  // ==========================================================================
  // RENDER SECTIONS
  // ==========================================================================
  
  // 1. Header
  const headerEl = createHeader();
  app.appendChild(headerEl);
  
  // 2. Hero ("Ruta por Australia")
  const heroEl = createHero();
  app.appendChild(heroEl);
  
  // 2.2. SearchBar (Horizontal card stacked responsive)
  const searchBarEl = createSearchBar({
    onSearch: (searchState) => {
      currentFilters.search = searchState.destination;
      updateState(currentFilters, "search-bar");
    }
  });
  searchBarEl.classList.add("search-bar--overlap");
  app.appendChild(searchBarEl);
  
  // 2.5. Section Header Title and Subtitle ("Vive tus propias aventuras")
  const sectionHeader = document.createElement("section");
  sectionHeader.className = "container section-intro-header";
  
  const sectionTitle = document.createElement("h2");
  sectionTitle.className = "section-intro-header__title";
  sectionTitle.textContent = "Vive tus propias aventuras";
  sectionHeader.appendChild(sectionTitle);
  
  const sectionSub = document.createElement("p");
  sectionSub.className = "section-intro-header__sub";
  sectionSub.textContent = "Filtra por tu próximo destino y comienza a explorar el mundo a tu manera";
  sectionHeader.appendChild(sectionSub);
  
  app.appendChild(sectionHeader);
  
  // 3. Main content workspace
  const mainWrapper = document.createElement("main");
  mainWrapper.className = "container main-workspace";
  
  // Sidebar Container for desktop
  const sidebarContainer = document.createElement("div");
  sidebarContainer.className = "desktop-sidebar-filters";
  
  const inlineFilters = createFilterPanel({
    initialState: currentFilters,
    onFilterChange: (newState) => {
      updateState(newState, "inline");
    },
  });
  sidebarContainer.appendChild(inlineFilters);
  mainWrapper.appendChild(sidebarContainer);
  
  // Main Grid Results panel
  const contentContainer = document.createElement("div");
  contentContainer.className = "grid-content-panel";
  
  const gridEl = createCardsGrid({ 
    cards: mockCards,
    onDetailsClick: (card, event) => {
      showPricingPopover(card, event.currentTarget as HTMLElement);
    },
    onBookClick: (card) => {
      showBookingModal(card);
    }
  });
  contentContainer.appendChild(gridEl);
  mainWrapper.appendChild(contentContainer);
  
  app.appendChild(mainWrapper);
  
  // 4. Footer
  const footerEl = createFooter();
  app.appendChild(footerEl);
  
  // 5. Mobile modal filters dialog
  const dialogFilters = createFilterPanel({
    initialState: currentFilters,
    dialogMode: true,
    onFilterChange: (newState) => {
      updateState(newState, "dialog");
    },
    onCloseDialog: () => {
      document.body.classList.remove("no-scroll");
    },
  }) as HTMLDialogElement;
  app.appendChild(dialogFilters);
  
  // 6. Mobile floating action button to trigger dialog
  const mobileFab = createButton({
    variant: "orange",
    size: "lg",
  });
  mobileFab.textContent = ""; // remove default label
  mobileFab.className = "dux-button dux-button--orange mobile-fab-btn";
  mobileFab.appendChild(createIcon({ name: "tag", size: 24, color: "var(--color-midnight-base)" }));
  mobileFab.setAttribute("aria-label", "Abrir filtros de búsqueda");
  
  mobileFab.addEventListener("click", () => {
    dialogFilters.showModal();
    document.body.classList.add("no-scroll");
  });
  
  app.appendChild(mobileFab);
  
  // ==========================================================================
  // REACTIVE STATE UPDATER & RENDERING SYNC
  // ==========================================================================
  
  function updateState(newState: FilterState, origin: "inline" | "dialog" | "search-bar") {
    currentFilters = { ...newState };
    
    // 1. Synchronize inputs bidirectionally
    if (origin === "inline" || origin === "search-bar") {
      // Sync dialog search field
      const dialogSearch = dialogFilters.querySelector(".dux-text-input__field") as HTMLInputElement;
      if (dialogSearch) dialogSearch.value = currentFilters.search;
      
      // Sync dialog price slider
      const dialogSlider = dialogFilters.querySelector(".filter-price-input") as HTMLInputElement;
      if (dialogSlider) {
        dialogSlider.value = String(currentFilters.maxPrice);
        const display = dialogFilters.querySelector(".filter-price-display");
        if (display) display.innerHTML = `Hasta: <strong>${currentFilters.maxPrice} €</strong>`;
      }
      
      // Sync dialog checkboxes
      const dialogCheckboxes = dialogFilters.querySelectorAll(".filter-checkbox-input") as NodeListOf<HTMLInputElement>;
      dialogCheckboxes.forEach((cb) => {
        const val = cb.value;
        cb.checked = 
          currentFilters.destinations.includes(val) || 
          currentFilters.activities.includes(val) || 
          currentFilters.ratings.includes(val);
      });
    }
    
    if (origin === "dialog" || origin === "search-bar") {
      // Sync inline search field
      const inlineSearch = inlineFilters.querySelector(".dux-text-input__field") as HTMLInputElement;
      if (inlineSearch) inlineSearch.value = currentFilters.search;
      
      // Sync inline price slider
      const inlineSlider = inlineFilters.querySelector(".filter-price-input") as HTMLInputElement;
      if (inlineSlider) {
        inlineSlider.value = String(currentFilters.maxPrice);
        const display = inlineFilters.querySelector(".filter-price-display");
        if (display) display.innerHTML = `Hasta: <strong>${currentFilters.maxPrice} €</strong>`;
      }
      
      // Sync inline checkboxes
      const inlineCheckboxes = inlineFilters.querySelectorAll(".filter-checkbox-input") as NodeListOf<HTMLInputElement>;
      inlineCheckboxes.forEach((cb) => {
        const val = cb.value;
        cb.checked = 
          currentFilters.destinations.includes(val) || 
          currentFilters.activities.includes(val) || 
          currentFilters.ratings.includes(val);
      });
    }
    
    // Sync SearchBar input if search changes
    const searchBarInput = searchBarEl.querySelector(".dux-text-input__field") as HTMLInputElement;
    if (searchBarInput && origin !== "search-bar") {
      searchBarInput.value = currentFilters.search;
    }
    
    // 2. Perform client-side filter computation
    const filteredCards = mockCards.filter((card) => {
      // A. Text Search (title and meta description match)
      const matchesSearch =
        currentFilters.search === "" ||
        card.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
        card.meta.toLowerCase().includes(currentFilters.search.toLowerCase());
        
      // B. Destinations matching
      const matchesDestination =
        currentFilters.destinations.length === 0 ||
        currentFilters.destinations.some((d) => card.meta.toLowerCase().includes(d.toLowerCase()));
        
      // C. Activities matching
      const matchesActivity =
        currentFilters.activities.length === 0 ||
        currentFilters.activities.includes(card.tag);
        
      // D. Price limit matching
      const cardPriceNum = parseFloat(card.price.replace(/[^\d,]/g, "").replace(",", "."));
      const matchesPrice = cardPriceNum <= currentFilters.maxPrice;
      
      // E. Ratings matching
      let matchesRating = true;
      if (currentFilters.ratings.length > 0) {
        matchesRating = currentFilters.ratings.some((ratingStr) => {
          if (ratingStr.includes("4.5+")) return card.rating >= 4.5;
          return true;
        });
      }
      
      return matchesSearch && matchesDestination && matchesActivity && matchesPrice && matchesRating;
    });
    
    // 3. Redraw cards grid
    const oldGridContainer = contentContainer.querySelector("#cards-grid-container-el");
    if (oldGridContainer) {
      oldGridContainer.remove();
    }
    
    const newGridEl = createCardsGrid({ 
      cards: filteredCards,
      onDetailsClick: (card, event) => {
        showPricingPopover(card, event.currentTarget as HTMLElement);
      },
      onBookClick: (card) => {
        showBookingModal(card);
      }
    });
    contentContainer.appendChild(newGridEl);
  }
}

// Start application
window.addEventListener("DOMContentLoaded", initApp);
