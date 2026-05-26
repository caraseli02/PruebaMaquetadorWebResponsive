import "./FilterPanel.css";
import { createTextInput } from "../../atoms/TextInput";
import { createButton } from "../../atoms/Button";
import { createIcon } from "../../atoms/Icon";

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
export function createFilterPanel({
  initialState = { search: "", categories: [], ratings: [] },
  onFilterChange,
  dialogMode = false,
  onCloseDialog,
}: FilterPanelProps = {}): HTMLElement {
  
  // Local state reference
  const state: FilterState = {
    search: initialState.search,
    categories: [...initialState.categories],
    ratings: [...initialState.ratings],
  };
  
  const triggerChange = () => {
    if (onFilterChange) {
      onFilterChange({
        search: state.search,
        categories: [...state.categories],
        ratings: [...state.ratings],
      });
    }
  };
  
  // Helper to create checkbox rows
  const createCheckboxRow = (
    label: string,
    value: string,
    checked: boolean,
    group: "categories" | "ratings"
  ): HTMLElement => {
    const labelEl = document.createElement("label");
    labelEl.className = "filter-checkbox-row";
    
    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "filter-checkbox-input";
    input.value = value;
    input.checked = checked;
    
    input.addEventListener("change", () => {
      if (group === "categories") {
        if (input.checked) {
          state.categories.push(value);
        } else {
          state.categories = state.categories.filter((c) => c !== value);
        }
      } else {
        if (input.checked) {
          state.ratings.push(value);
        } else {
          state.ratings = state.ratings.filter((r) => r !== value);
        }
      }
      triggerChange();
    });
    
    const textSpan = document.createElement("span");
    textSpan.className = "filter-checkbox-label";
    textSpan.textContent = label;
    
    labelEl.append(input, textSpan);
    return labelEl;
  };
  
  // Create Form Wrapper Elements
  const formContent = document.createElement("div");
  formContent.className = "filter-panel__form-content";
  
  // 1. Search Box
  const searchInput = createTextInput({
    label: "BÚSQUEDA",
    placeholder: "Buscar curso...",
    value: state.search,
    icon: "compass",
  });
  
  const searchField = searchInput.querySelector(".dux-text-input__field") as HTMLInputElement;
  if (searchField) {
    searchField.addEventListener("input", () => {
      state.search = searchField.value;
      triggerChange();
    });
  }
  formContent.appendChild(searchInput);
  
  // 2. Categories checkbox section
  const catSection = document.createElement("section");
  catSection.className = "filter-section";
  
  const catTitle = document.createElement("h4");
  catTitle.className = "filter-section__title";
  catTitle.textContent = "CATEGORÍAS";
  catSection.appendChild(catTitle);
  
  const catList = document.createElement("div");
  catList.className = "filter-section__list";
  
  const categories = ["Frontend", "Backend", "Accesibilidad", "UX/UI"];
  categories.forEach((cat) => {
    const isChecked = state.categories.includes(cat);
    catList.appendChild(createCheckboxRow(cat, cat, isChecked, "categories"));
  });
  catSection.appendChild(catList);
  formContent.appendChild(catSection);
  
  // 3. Ratings checkbox section
  const ratingSection = document.createElement("section");
  ratingSection.className = "filter-section";
  
  const ratingTitle = document.createElement("h4");
  ratingTitle.className = "filter-section__title";
  ratingTitle.textContent = "VALORACIÓN";
  ratingSection.appendChild(ratingTitle);
  
  const ratingList = document.createElement("div");
  ratingList.className = "filter-section__list";
  
  ratingList.appendChild(
    createCheckboxRow("4.5+ estrellas", "4.5+", state.ratings.includes("4.5+"), "ratings")
  );
  ratingSection.appendChild(ratingList);
  formContent.appendChild(ratingSection);
  
  // If rendering inside a native modal Dialog for mobile view
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
    
    // Close button inside header
    const closeBtn = createButton({
      variant: "outline",
      size: "sm",
    });
    closeBtn.classList.add("filter-dialog__close-btn");
    closeBtn.innerHTML = ""; // clear label
    closeBtn.appendChild(createIcon({ name: "close", size: 20 }));
    closeBtn.setAttribute("aria-label", "Cerrar filtros");
    closeBtn.addEventListener("click", () => {
      dialog.close();
      if (onCloseDialog) onCloseDialog();
    });
    dialogHeader.appendChild(closeBtn);
    wrapper.appendChild(dialogHeader);
    
    // Append form elements
    wrapper.appendChild(formContent);
    
    // Add Apply/Confirm button at bottom
    const applyBtn = createButton({
      label: "Aplicar Filtros",
      variant: "plum",
      size: "lg",
    });
    applyBtn.style.width = "100%";
    applyBtn.style.marginTop = "var(--space-md)";
    applyBtn.addEventListener("click", () => {
      dialog.close();
      if (onCloseDialog) onCloseDialog();
    });
    wrapper.appendChild(applyBtn);
    
    dialog.appendChild(wrapper);
    
    // Accessibility scroll locking
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
    if (searchField) searchField.value = "";
    
    const checkboxes = formContent.querySelectorAll(".filter-checkbox-input") as NodeListOf<HTMLInputElement>;
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
