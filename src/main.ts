import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/responsive.css";

import { createHeader } from "./components/organisms/Header/Header";
import { createHero } from "./components/organisms/Hero/Hero";
import { createSearchBar } from "./components/organisms/SearchBar/SearchBar";
import { createFilterPanel } from "./components/organisms/FilterPanel/FilterPanel";
import { TravelFilterState } from "./components/organisms/FilterPanel/TravelFilterState";
import { createCardsGrid } from "./components/organisms/CardsGrid/CardsGrid";
import { createFooter } from "./components/organisms/Footer/Footer";
import { createButton } from "./components/atoms/Button";
import { createIcon } from "./components/atoms/Icon";
import { createPricingPopover } from "./components/molecules/Popover";
import { OverlayManager } from "./components/molecules/OverlayManager";
import type { CardData } from "./types";

/**
 * Main application coordinator and reactive state manager.
 * Limpio y libre de queries invasivas sobre el DOM externo de los componentes.
 */
function initApp() {
  const app = document.getElementById("app");
  if (!app) return;
  
  // Clear base container
  app.innerHTML = "";
  
  // Inicialización del Módulo Profundo: TravelFilterState
  const filterState = new TravelFilterState();
  
  // ==========================================================================
  // PRICING POPOVER & CHECKOUT DIALOG INITIALIZATION (Mediated by OverlayManager)
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
        OverlayManager.closePopover();
      },
    });
    
    popover.replaceWith(nextPopover);
    popover = nextPopover;
    
    OverlayManager.openPopover(popover, triggerEl);
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
    
    OverlayManager.openModal(bookingDialog);
    
    // Close triggers
    const closeBtn = bookingDialog.querySelector(".booking-dialog__close");
    const cancelBtn = bookingDialog.querySelector(".booking-cancel-btn");
    const form = bookingDialog.querySelector(".booking-dialog__form") as HTMLFormElement;
    
    const closeModal = () => {
      OverlayManager.closeModal(bookingDialog);
    };
    
    closeBtn?.addEventListener("click", closeModal);
    cancelBtn?.addEventListener("click", closeModal);
    
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
    filterState,
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
    filterState,
  });
  sidebarContainer.appendChild(inlineFilters);
  mainWrapper.appendChild(sidebarContainer);
  
  // Main Grid Results panel
  const contentContainer = document.createElement("div");
  contentContainer.className = "grid-content-panel";
  mainWrapper.appendChild(contentContainer);
  
  app.appendChild(mainWrapper);
  
  // 4. Footer
  const footerEl = createFooter();
  app.appendChild(footerEl);
  
  // 5. Mobile modal filters dialog
  const dialogFilters = createFilterPanel({
    filterState,
    dialogMode: true,
    onCloseDialog: () => {
      OverlayManager.closeModal(dialogFilters);
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
    OverlayManager.openModal(dialogFilters);
  });
  
  app.appendChild(mobileFab);
  
  // ==========================================================================
  // REACTIVE STATE UPDATER & RENDERING SYNC
  // ==========================================================================
  
  // Suscribirse a los cambios de estado en TravelFilterState para redibujar la grilla de tarjetas
  filterState.subscribe((_state, filteredCards) => {
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
  });
}

// Start application
window.addEventListener("DOMContentLoaded", initApp);
