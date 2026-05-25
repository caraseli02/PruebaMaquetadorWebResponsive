import "./FilterPanel.css";
import { TextInput } from "../../atoms/TextInput/TextInput";
import { FilterGroup } from "../../molecules/FilterGroup/FilterGroup";
import { Button } from "../../atoms/Button/Button";
import { Icon } from "../../atoms/Icon/Icon";

export interface FilterState {
  search: string;
  categories: string[];
  ratings: string[];
}

export interface FilterPanelProps {
  initialState?: FilterState;
  onFilterChange?: (state: FilterState) => void;
  dialogMode?: boolean;
  onCloseDialog?: () => void;
}

/**
 * Filter Panel organism supporting both inline sidebar and accessible modal dialog rendering modes.
 */
export function FilterPanel({
  initialState = { search: "", categories: [], ratings: [] },
  onFilterChange,
  dialogMode = false,
  onCloseDialog,
}: FilterPanelProps = {}): HTMLElement {
  
  // Track state active values
  const state: FilterState = { ...initialState };
  
  const triggerChange = () => {
    if (onFilterChange) {
      onFilterChange({ ...state });
    }
  };
  
  // Create Main Panel Inner Form Content
  const formContent = document.createElement("div");
  formContent.className = "filter-panel-content-wrapper";
  formContent.style.display = "flex";
  formContent.style.flexDirection = "column";
  formContent.style.gap = "var(--space-xl)";
  
  // 1. Search Box
  const searchInput = TextInput({
    placeholder: "Buscar...",
    value: state.search,
    iconName: "search",
    onChange: (val) => {
      state.search = val;
      triggerChange();
    },
  });
  formContent.appendChild(searchInput);
  
  // 2. Categories filter group
  const categoriesGroup = FilterGroup({
    title: "Categorías",
    items: [
      { label: "Frontend", checked: state.categories.includes("Frontend") },
      { label: "Backend", checked: state.categories.includes("Backend") },
      { label: "Accesibilidad", checked: state.categories.includes("Accesibilidad") },
      { label: "UX/UI", checked: state.categories.includes("UX/UI") },
    ],
    onChange: (vals) => {
      state.categories = vals;
      triggerChange();
    },
  });
  formContent.appendChild(categoriesGroup);
  
  // 3. Ratings filter group
  const ratingsGroup = FilterGroup({
    title: "Valoración",
    items: [
      { label: "4.5+ estrellas", checked: state.ratings.includes("4.5+ estrellas") },
      { label: "4.0+ estrellas", checked: state.ratings.includes("4.0+ estrellas") },
    ],
    onChange: (vals) => {
      state.ratings = vals;
      triggerChange();
    },
  });
  formContent.appendChild(ratingsGroup);
  
  // If rendering inside a native modal Dialog
  if (dialogMode) {
    const dialog = document.createElement("dialog");
    dialog.className = "filter-dialog";
    dialog.id = "filters-dialog-modal";
    
    const wrapper = document.createElement("div");
    wrapper.className = "filter-dialog__content";
    
    // Header section inside dialog
    const dialogHeader = document.createElement("div");
    dialogHeader.className = "filter-dialog__header";
    
    const title = document.createElement("h3");
    title.className = "filter-dialog__title";
    title.textContent = "Filtros";
    dialogHeader.appendChild(title);
    
    // Close button
    const closeBtn = Button({
      variant: "ghost",
      iconOnly: true,
      iconName: "close",
      ariaLabel: "Cerrar filtros",
      onClick: () => {
        dialog.close();
        if (onCloseDialog) onCloseDialog();
      },
    });
    dialogHeader.appendChild(closeBtn);
    wrapper.appendChild(dialogHeader);
    
    // Append form elements
    wrapper.appendChild(formContent);
    
    // Add Apply/Confirm button at bottom
    const applyBtn = Button({
      label: "Aplicar Filtros",
      variant: "primary",
      onClick: () => {
        dialog.close();
        if (onCloseDialog) onCloseDialog();
      },
    });
    wrapper.appendChild(applyBtn);
    
    dialog.appendChild(wrapper);
    
    // Accessibility: prevent background scroll during open
    dialog.addEventListener("close", () => {
      document.body.classList.remove("no-scroll");
    });
    
    return dialog;
  }
  
  // Default: Render inline sidebar panel
  const panel = document.createElement("aside");
  panel.className = "filter-panel";
  panel.setAttribute("aria-label", "Panel de filtros y búsqueda");
  
  const header = document.createElement("div");
  header.className = "filter-panel__header";
  
  const title = document.createElement("h3");
  title.className = "filter-panel__title";
  const filterIcon = Icon({ name: "filter", size: 16 });
  title.appendChild(filterIcon);
  const textSpan = document.createElement("span");
  textSpan.textContent = "Filtros";
  title.appendChild(textSpan);
  header.appendChild(title);
  
  // Clear filters action link
  const clearBtn = document.createElement("button");
  clearBtn.className = "filter-panel__clear-btn";
  clearBtn.textContent = "Limpiar todo";
  clearBtn.type = "button";
  clearBtn.addEventListener("click", () => {
    // Reset state inputs
    state.search = "";
    state.categories = [];
    state.ratings = [];
    
    // Clear DOM input values
    const textInput = searchInput.querySelector(".input-field") as HTMLInputElement;
    if (textInput) textInput.value = "";
    
    const checkboxes = formContent.querySelectorAll(".checkbox-input") as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((cb) => {
      cb.checked = false;
    });
    
    triggerChange();
  });
  header.appendChild(clearBtn);
  panel.appendChild(header);
  
  panel.appendChild(formContent);
  
  return panel;
}
