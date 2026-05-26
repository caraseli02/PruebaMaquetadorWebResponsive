import "./FilterPanel.css";
import { createButton } from "../../atoms/Button";
import { createIcon, type IconName } from "../../atoms/Icon";

export interface FilterState {
  search: string;
  destinations: string[];
  activities: string[];
  maxPrice: number;
  ratings: string[];
}

export interface FilterPanelProps {
  initialState?: FilterState;
  onFilterChange?: (state: FilterState) => void;
  dialogMode?: boolean;
  onCloseDialog?: () => void;
}

type FilterGroup = "destinations" | "activities" | "ratings";

const activityOptions = [
  "Quads",
  "Parapente",
  "Rafting",
  "Explora",
  "Buceo",
  "Paracaídas",
  "Snowboard",
  "Surf",
];

const updateGroup = (state: FilterState, group: FilterGroup, value: string, checked: boolean) => {
  const current = new Set(state[group]);
  if (checked) {
    current.add(value);
  } else {
    current.delete(value);
  }
  state[group] = [...current];
};

const parsePrice = (value: string, fallback: number) => {
  const number = Number(value.replace(/[^\d]/g, ""));
  return Number.isFinite(number) && number > 0 ? number : fallback;
};

/**
 * Filter Panel organism matching the Figma sidebar composition.
 */
export function createFilterPanel({
  initialState = { search: "", destinations: [], activities: [], maxPrice: 700, ratings: [] },
  onFilterChange,
  dialogMode = false,
  onCloseDialog,
}: FilterPanelProps = {}): HTMLElement {
  const state: FilterState = {
    search: initialState.search,
    destinations: [...initialState.destinations],
    activities: [...initialState.activities],
    maxPrice: initialState.maxPrice,
    ratings: [...initialState.ratings],
  };

  const triggerChange = () => {
    onFilterChange?.({
      search: state.search,
      destinations: [...state.destinations],
      activities: [...state.activities],
      maxPrice: state.maxPrice,
      ratings: [...state.ratings],
    });
  };

  const createSectionToggle = ({
    icon,
    label,
    expanded = false,
  }: {
    icon: IconName;
    label: string;
    expanded?: boolean;
  }) => {
    const button = document.createElement("button");
    button.className = `filter-section-toggle${expanded ? " filter-section-toggle--expanded" : ""}`;
    button.type = "button";
    button.setAttribute("aria-expanded", String(expanded));

    const iconEl = createIcon({ name: icon, size: 24, color: "currentColor" });
    const labelEl = document.createElement("span");
    labelEl.textContent = label;
    const chevron = createIcon({
      name: expanded ? "chevronDownCompact" : "chevronRight",
      size: 18,
      color: "currentColor",
      className: "filter-section-toggle__chevron",
    });

    button.append(iconEl, labelEl, chevron);
    return button;
  };

  const createCheckboxRow = (
    label: string,
    value: string,
    checked: boolean,
    group: FilterGroup
  ): HTMLElement => {
    const labelEl = document.createElement("label");
    labelEl.className = "filter-checkbox-row";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "filter-checkbox-input";
    input.value = value;
    input.checked = checked;
    input.addEventListener("change", () => {
      updateGroup(state, group, value, input.checked);
      triggerChange();
    });

    const textSpan = document.createElement("span");
    textSpan.className = "filter-checkbox-label";
    textSpan.textContent = label;

    const info = document.createElement("span");
    info.className = "filter-checkbox-info";
    info.textContent = "i";
    info.title = "Lorem ipsum";
    info.setAttribute("aria-label", `Más información sobre ${label}`);

    labelEl.append(input, textSpan, info);
    return labelEl;
  };

  const createPriceInput = (placeholder: string, value = "") => {
    const wrapper = document.createElement("label");
    wrapper.className = "filter-price-field";
    wrapper.appendChild(createIcon({ name: "tag", size: 22, color: "currentColor" }));

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.placeholder = placeholder;
    input.value = value;
    if (placeholder === "Máximo") {
      input.className = "filter-price-input";
      input.addEventListener("input", () => {
        state.maxPrice = parsePrice(input.value, state.maxPrice);
        triggerChange();
      });
    }

    wrapper.appendChild(input);
    return wrapper;
  };

  const formContent = document.createElement("div");
  formContent.className = "filter-panel__form-content";

  formContent.append(createSectionToggle({ icon: "globe", label: "Destinos" }));

  const activitySection = document.createElement("section");
  activitySection.className = "filter-section filter-section--activity";
  activitySection.append(createSectionToggle({ icon: "landscape", label: "Aventura", expanded: true }));

  const activityList = document.createElement("div");
  activityList.className = "filter-section__list";
  activityOptions.forEach((activity) => {
    activityList.append(
      createCheckboxRow(activity, activity, state.activities.includes(activity), "activities")
    );
  });
  activitySection.append(activityList);

  const moreLink = document.createElement("a");
  moreLink.className = "filter-section__more";
  moreLink.href = "#";
  moreLink.textContent = "Ver 21 más";
  moreLink.addEventListener("click", (event) => event.preventDefault());
  activitySection.append(moreLink);
  formContent.append(activitySection);

  formContent.append(createSectionToggle({ icon: "home", label: "Alojamiento" }));

  const priceSection = document.createElement("section");
  priceSection.className = "filter-section filter-section--price";
  priceSection.append(createSectionToggle({ icon: "tag", label: "Precio", expanded: true }));

  const priceFields = document.createElement("div");
  priceFields.className = "filter-price-fields";
  priceFields.append(createPriceInput("Mínimo"), createPriceInput("Máximo"));
  priceSection.append(priceFields);
  formContent.append(priceSection);

  if (dialogMode) {
    const dialog = document.createElement("dialog");
    dialog.className = "filter-dialog";
    dialog.id = "filters-dialog-modal";

    const wrapper = document.createElement("div");
    wrapper.className = "filter-dialog__content";

    const dialogHeader = document.createElement("div");
    dialogHeader.className = "filter-dialog__header";

    const title = document.createElement("h3");
    title.className = "filter-dialog__title";
    title.textContent = "Filtrar mi búsqueda";
    dialogHeader.appendChild(title);

    const closeBtn = createButton({ variant: "outline", size: "sm" });
    closeBtn.classList.add("filter-dialog__close-btn");
    closeBtn.innerHTML = "";
    closeBtn.appendChild(createIcon({ name: "close", size: 20 }));
    closeBtn.setAttribute("aria-label", "Cerrar filtros");
    closeBtn.addEventListener("click", () => {
      dialog.close();
      onCloseDialog?.();
    });
    dialogHeader.appendChild(closeBtn);

    const applyBtn = createButton({ label: "Aplicar Filtros", variant: "plum", size: "lg" });
    applyBtn.style.width = "100%";
    applyBtn.addEventListener("click", () => {
      dialog.close();
      onCloseDialog?.();
    });

    wrapper.append(dialogHeader, formContent, applyBtn);
    dialog.appendChild(wrapper);
    dialog.addEventListener("close", () => document.body.classList.remove("no-scroll"));
    return dialog;
  }

  const panel = document.createElement("aside");
  panel.className = "filter-panel";
  panel.setAttribute("aria-label", "Panel de filtros y búsqueda");

  const header = document.createElement("div");
  header.className = "filter-panel__header";

  const title = document.createElement("h3");
  title.className = "filter-panel__title";
  title.textContent = "Filtrar mi búsqueda";

  header.appendChild(title);
  panel.append(header, formContent);
  return panel;
}
