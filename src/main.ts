import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/responsive.css";

import { Header } from "./components/organisms/Header/Header";
import { Hero } from "./components/organisms/Hero/Hero";
import { FilterPanel } from "./components/organisms/FilterPanel/FilterPanel";
import type { FilterState } from "./components/organisms/FilterPanel/FilterPanel";
import { CardsGrid } from "./components/organisms/CardsGrid/CardsGrid";
import { Footer } from "./components/organisms/Footer/Footer";
import { Button } from "./components/atoms/Button/Button";
import { mockCards } from "./data/cards";

/**
 * Main application coordinator and reactive state manager.
 */
function initApp() {
  const app = document.getElementById("app");
  if (!app) return;
  
  // Clear index.html base main
  app.innerHTML = "";
  
  // State variables
  let currentFilters: FilterState = {
    search: "",
    categories: [],
    ratings: [],
  };
  
  // ==========================================================================
  // RENDER SECTIONS
  // ==========================================================================
  
  // 1. Header
  const headerEl = Header();
  app.appendChild(headerEl);
  
  // 2. Hero
  const heroEl = Hero();
  app.appendChild(heroEl);
  
  // 3. Main Workspace container (Search Grid layout wrapper)
  const mainWrapper = document.createElement("main");
  mainWrapper.className = "container main-workspace";
  mainWrapper.style.paddingTop = "var(--space-4xl)";
  mainWrapper.style.paddingBottom = "var(--space-5xl)";
  mainWrapper.style.display = "grid";
  mainWrapper.style.gridTemplateColumns = "1fr";
  mainWrapper.style.gap = "var(--space-3xl)";
  
  // Inline Sidebar Filter panel (hidden on mobile, visible on desktop)
  const sidebarContainer = document.createElement("div");
  sidebarContainer.className = "desktop-sidebar-filters";
  
  const inlineFilters = FilterPanel({
    initialState: currentFilters,
    onFilterChange: (newState) => {
      updateState(newState, "inline");
    },
  });
  sidebarContainer.appendChild(inlineFilters);
  mainWrapper.appendChild(sidebarContainer);
  
  // Content panel (Cards grid list)
  const contentContainer = document.createElement("div");
  contentContainer.className = "grid-content-panel";
  
  const gridEl = CardsGrid({ cards: mockCards });
  contentContainer.appendChild(gridEl);
  mainWrapper.appendChild(contentContainer);
  
  app.appendChild(mainWrapper);
  
  // 4. Footer
  const footerEl = Footer();
  app.appendChild(footerEl);
  
  // 5. Mobile dialog modal filter panel (hidden by default)
  const dialogFilters = FilterPanel({
    initialState: currentFilters,
    dialogMode: true,
    onFilterChange: (newState) => {
      updateState(newState, "dialog");
    },
    onCloseDialog: () => {
      // Re-enable body scroll
      document.body.classList.remove("no-scroll");
    },
  }) as HTMLDialogElement;
  app.appendChild(dialogFilters);
  
  // 6. Mobile floating action button to open dialog filters
  const mobileFab = Button({
    variant: "primary",
    iconOnly: true,
    circle: true,
    iconName: "filter",
    ariaLabel: "Abrir panel flotante de filtros",
    className: "mobile-fab-btn",
    onClick: () => {
      dialogFilters.showModal();
      document.body.classList.add("no-scroll");
    },
  });
  app.appendChild(mobileFab);
  
  // ==========================================================================
  // REACTIVE STATE UPDATER & RENDERING SYNC LYNX
  // ==========================================================================
  
  function updateState(newState: FilterState, origin: "inline" | "dialog") {
    currentFilters = { ...newState };
    
    // 1. Synchronize sibling inputs value representation
    if (origin === "inline") {
      // Sync to dialog modal inputs
      const dialogSearch = dialogFilters.querySelector(".input-field") as HTMLInputElement;
      if (dialogSearch) dialogSearch.value = currentFilters.search;
      
      const dialogCheckboxes = dialogFilters.querySelectorAll(".checkbox-input") as NodeListOf<HTMLInputElement>;
      dialogCheckboxes.forEach((cb) => {
        const val = cb.value;
        cb.checked = currentFilters.categories.includes(val) || currentFilters.ratings.includes(val);
      });
    } else {
      // Sync to inline sidebar inputs
      const inlineSearch = inlineFilters.querySelector(".input-field") as HTMLInputElement;
      if (inlineSearch) inlineSearch.value = currentFilters.search;
      
      const inlineCheckboxes = inlineFilters.querySelectorAll(".checkbox-input") as NodeListOf<HTMLInputElement>;
      inlineCheckboxes.forEach((cb) => {
        const val = cb.value;
        cb.checked = currentFilters.categories.includes(val) || currentFilters.ratings.includes(val);
      });
    }
    
    // 2. Perform mock filtering
    const filteredCards = mockCards.filter((card) => {
      // A. Search matching
      const matchesSearch =
        currentFilters.search === "" ||
        card.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
        card.description.toLowerCase().includes(currentFilters.search.toLowerCase());
        
      // B. Categories matching (trip tags)
      const matchesCategory =
        currentFilters.categories.length === 0 ||
        card.tags.some((tag) => currentFilters.categories.includes(tag));
        
      // C. Ratings matching
      let matchesRating = true;
      if (currentFilters.ratings.length > 0) {
        matchesRating = currentFilters.ratings.some((ratingStr) => {
          if (ratingStr.includes("4.5+")) return card.rating >= 4.5;
          if (ratingStr.includes("4.0+")) return card.rating >= 4.0;
          return true;
        });
      }
      
      return matchesSearch && matchesCategory && matchesRating;
    });
    
    // 3. Render updated cards in grid container
    const oldGridContainer = contentContainer.querySelector("#cards-grid-container-el");
    if (oldGridContainer) {
      oldGridContainer.remove();
    }
    
    const newGridEl = CardsGrid({ cards: filteredCards });
    contentContainer.appendChild(newGridEl);
  }
}

// Start application coordinator
window.addEventListener("DOMContentLoaded", initApp);
