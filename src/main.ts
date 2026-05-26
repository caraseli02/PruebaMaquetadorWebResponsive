import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/responsive.css";

import { createHeader } from "./components/organisms/Header/Header";
import { createHero } from "./components/organisms/Hero/Hero";
import { createFilterPanel } from "./components/organisms/FilterPanel/FilterPanel";
import type { FilterState } from "./components/organisms/FilterPanel/FilterPanel";
import { createCardsGrid } from "./components/organisms/CardsGrid/CardsGrid";
import { createFooter } from "./components/organisms/Footer/Footer";
import { createButton } from "./components/atoms/Button";
import { createIcon } from "./components/atoms/Icon";
import { mockCards } from "./data/cards";

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
    categories: [],
    ratings: [],
  };
  
  // ==========================================================================
  // RENDER SECTIONS
  // ==========================================================================
  
  // 1. Header
  const headerEl = createHeader();
  app.appendChild(headerEl);
  
  // 2. Hero ("Ruta por Australia")
  const heroEl = createHero();
  app.appendChild(heroEl);
  
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
  
  const gridEl = createCardsGrid({ cards: mockCards });
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
  
  function updateState(newState: FilterState, origin: "inline" | "dialog") {
    currentFilters = { ...newState };
    
    // 1. Synchronize inputs bidirectionally
    if (origin === "inline") {
      // Sync search field
      const dialogSearch = dialogFilters.querySelector(".dux-text-input__field") as HTMLInputElement;
      if (dialogSearch) dialogSearch.value = currentFilters.search;
      
      // Sync checkboxes
      const dialogCheckboxes = dialogFilters.querySelectorAll(".filter-checkbox-input") as NodeListOf<HTMLInputElement>;
      dialogCheckboxes.forEach((cb) => {
        const val = cb.value;
        cb.checked = currentFilters.categories.includes(val) || currentFilters.ratings.includes(val);
      });
    } else {
      // Sync search field
      const inlineSearch = inlineFilters.querySelector(".dux-text-input__field") as HTMLInputElement;
      if (inlineSearch) inlineSearch.value = currentFilters.search;
      
      // Sync checkboxes
      const inlineCheckboxes = inlineFilters.querySelectorAll(".filter-checkbox-input") as NodeListOf<HTMLInputElement>;
      inlineCheckboxes.forEach((cb) => {
        const val = cb.value;
        cb.checked = currentFilters.categories.includes(val) || currentFilters.ratings.includes(val);
      });
    }
    
    // 2. Perform client-side filter computation
    const filteredCards = mockCards.filter((card) => {
      // A. Text Search (title match)
      const matchesSearch =
        currentFilters.search === "" ||
        card.title.toLowerCase().includes(currentFilters.search.toLowerCase());
        
      // B. Categories matching
      const matchesCategory =
        currentFilters.categories.length === 0 ||
        currentFilters.categories.includes(card.tag);
        
      // C. Ratings matching (4.5+ estrellas)
      let matchesRating = true;
      if (currentFilters.ratings.length > 0) {
        matchesRating = currentFilters.ratings.some((ratingStr) => {
          if (ratingStr.includes("4.5+")) return card.rating >= 4.5;
          return true;
        });
      }
      
      return matchesSearch && matchesCategory && matchesRating;
    });
    
    // 3. Redraw cards grid
    const oldGridContainer = contentContainer.querySelector("#cards-grid-container-el");
    if (oldGridContainer) {
      oldGridContainer.remove();
    }
    
    const newGridEl = createCardsGrid({ cards: filteredCards });
    contentContainer.appendChild(newGridEl);
  }
}

// Start application
window.addEventListener("DOMContentLoaded", initApp);
