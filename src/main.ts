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
      subtitleHtml: card.meta.replace("·", "").trim(),
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

  // Backdrop click dismiss for Booking Dialog
  bookingDialog.addEventListener("click", (e) => {
    if (e.target === bookingDialog) {
      OverlayManager.closeModal(bookingDialog);
    }
  });

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
          <form class="booking-dialog__form" novalidate>
            <div class="booking-form-field">
              <label for="booking-name">Nombre completo</label>
              <input type="text" id="booking-name" required pattern=".*\\S.*" placeholder="Tu nombre..." class="booking-input" />
              <span class="booking-error-msg" aria-live="polite">Por favor, introduce tu nombre completo.</span>
            </div>
            <div class="booking-form-field">
              <label for="booking-email">Correo electrónico</label>
              <input type="email" id="booking-email" required placeholder="Tu correo..." class="booking-input" />
              <span class="booking-error-msg" aria-live="polite">Por favor, introduce un correo electrónico válido.</span>
            </div>
            <div class="booking-form-field">
              <label for="booking-phone">Teléfono de contacto</label>
              <input type="tel" id="booking-phone" required pattern="[0-9\\s\\+\\-\\(\\)]{9,}" placeholder="Tu teléfono..." class="booking-input" />
              <span class="booking-error-msg" aria-live="polite">Por favor, introduce un teléfono válido (mínimo 9 dígitos).</span>
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

      // Native validation triggers
      if (!form.checkValidity()) {
        form.classList.add("booking-dialog__form--submitted");
        // Focus first invalid element
        const firstInvalid = form.querySelector(":invalid") as HTMLInputElement;
        firstInvalid?.focus();
        return;
      }

      // Show beautiful success view
      const body = bookingDialog.querySelector(".booking-dialog__body") as HTMLElement;
      if (body) {
        body.innerHTML = `
          <div class="booking-dialog__success-state">
            <div class="booking-dialog__success-icon">✓</div>
            <h3 class="booking-dialog__success-title">¡Reserva Solicitada!</h3>
            <p class="booking-dialog__success-message">Tu solicitud para <strong>${card.title}</strong> ha sido registrada con éxito. Nos pondremos en contacto contigo en breve.</p>
            <button class="dux-button dux-button--plum dux-button--lg booking-success-close-btn" type="button">Entendido</button>
          </div>
        `;
        const successCloseBtn = body.querySelector(".booking-success-close-btn");
        successCloseBtn?.addEventListener("click", closeModal);
      }
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
  sectionSub.textContent = "Para los que les gusta explorar y conocer mundo sin complejos";
  sectionHeader.appendChild(sectionSub);

  // Mobile/Tablet Filter Trigger Button
  const filterTriggerBtn = createButton({ label: "", variant: "outline", size: "md" });
  filterTriggerBtn.className = "dux-button dux-button--outline mobile-filter-trigger";
  filterTriggerBtn.appendChild(createIcon({ name: "filter", size: 18, color: "currentColor" }) || document.createTextNode(""));
  filterTriggerBtn.appendChild(document.createTextNode(" Ver filtros"));
  filterTriggerBtn.setAttribute("aria-label", "Abrir filtros de búsqueda");

  filterTriggerBtn.addEventListener("click", () => {
    const dialogFilters = document.querySelector(".filter-dialog") as HTMLDialogElement;
    if (dialogFilters) OverlayManager.openModal(dialogFilters);
  });
  
  sectionHeader.appendChild(filterTriggerBtn);
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
