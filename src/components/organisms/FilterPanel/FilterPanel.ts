import "./FilterPanel.css";
import { createButton } from "../../atoms/Button";
import { createIcon, type IconName } from "../../atoms/Icon";
import { TravelFilterState, type FilterState } from "./TravelFilterState";

export interface FilterPanelProps {
  filterState?: TravelFilterState;
  initialState?: FilterState;
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

const parsePrice = (value: string, fallback: number) => {
  const number = Number(value.replace(/[^\d]/g, ""));
  return Number.isFinite(number) && number > 0 ? number : fallback;
};

export function createFilterPanel({
  filterState: _filterState,
  initialState,
  dialogMode = false,
  onCloseDialog,
}: FilterPanelProps = {}): HTMLElement {
  const filterState = _filterState ?? new TravelFilterState(initialState);


  
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

    const iconEl = createIcon({ name: icon, size: 18, color: "currentColor" });
    const labelEl = document.createElement("span");
    labelEl.textContent = label;
    const chevron = createIcon({
      name: expanded ? "chevronDown" : "chevronRight",
      size: 16,
      color: "currentColor",
      className: "filter-section-toggle__chevron",
    });

    button.append(iconEl, labelEl, chevron);
    return button;
  };

  const createCheckboxRow = (
    label: string,
    value: string,
    group: FilterGroup
  ): HTMLElement => {
    const labelEl = document.createElement("label");
    labelEl.className = "filter-checkbox-row";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "filter-checkbox-input";
    input.dataset.group = group;
    input.value = value;
    
    input.addEventListener("change", () => {
      if (group === "activities") {
        filterState.toggleActivity(value);
      } else if (group === "destinations") {
        filterState.toggleDestination(value);
      } else if (group === "ratings") {
        filterState.toggleRating(value);
      }
    });

    const textSpan = document.createElement("span");
    textSpan.className = "filter-checkbox-label";
    textSpan.textContent = label;

    const descriptions: Record<string, string> = {
      "Quads": "Excursión en cuatrimoto todoterreno por dunas.",
      "Parapente": "Vuelo tándem con instructor y vistas panorámicas.",
      "Rafting": "Descenso de ríos rápidos de montaña en balsa.",
      "Explora": "Senderismo guiado por parajes naturales protegidos.",
      "Buceo": "Inmersión submarina para observar arrecifes de coral.",
      "Paracaídas": "Salto tándem de caída libre a 4000 metros.",
      "Snowboard": "Descenso de pistas de esquí en tabla sobre nieve.",
      "Surf": "Curso de iniciación para coger olas en playas de arena."
    };

    const info = document.createElement("span");
    info.className = "filter-checkbox-info";
    info.textContent = "i";
    info.title = descriptions[value] ?? "Más detalles sobre esta experiencia de aventura.";
    info.setAttribute("aria-label", `Más información sobre ${label}`);

    labelEl.append(input, textSpan, info);
    return labelEl;
  };

  const createPriceInput = (placeholder: string) => {
    const wrapper = document.createElement("label");
    wrapper.className = "filter-price-field";
    wrapper.appendChild(createIcon({ name: "tag", size: 18, color: "currentColor" }));

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.placeholder = placeholder;
    input.id = `filter-price-${placeholder.toLowerCase() === "mínimo" ? "min" : "max"}`;
    input.setAttribute("aria-label", `Precio ${placeholder}`);
    wrapper.htmlFor = input.id;

    if (placeholder === "Máximo") {
      input.className = "filter-price-input";
      input.addEventListener("change", () => {
        const val = parsePrice(input.value, filterState.getState().maxPrice);
        filterState.setMaxPrice(val);
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
      createCheckboxRow(activity, activity, "activities")
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

  let container: HTMLElement;

  if (dialogMode) {
    const dialog = document.createElement("dialog");
    dialog.className = "filter-dialog";
    dialog.id = "filters-dialog-modal";

    const wrapper = document.createElement("div");
    wrapper.className = "filter-dialog__wrapper";

    const dialogHeader = document.createElement("div");
    dialogHeader.className = "filter-dialog__header";

    const title = document.createElement("h3");
    title.className = "filter-dialog__title";
    title.textContent = "Filtrar mi búsqueda";
    dialogHeader.appendChild(title);

    const closeBtn = createButton({ variant: "outline", size: "sm" });
    closeBtn.classList.add("filter-dialog__close-btn");
    closeBtn.replaceChildren(createIcon({ name: "close", size: 20 }));
    closeBtn.setAttribute("aria-label", "Cerrar filtros");
    closeBtn.addEventListener("click", () => {
      dialog.close();
      onCloseDialog?.();
    });
    dialogHeader.appendChild(closeBtn);

    const content = document.createElement("div");
    content.className = "filter-dialog__content";
    content.appendChild(formContent);

    wrapper.append(dialogHeader, content);
    dialog.appendChild(wrapper);

    // Backdrop click dismiss for dialog
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        dialog.close();
        onCloseDialog?.();
      }
    });

    container = dialog;
  } else {
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
    container = panel;
  }

  // SUSCRIPCIÓN REACTIVA AL ESTADO DE FILTRADO PARA RENDERIZACIÓN INTERNA COHERENTE
  filterState.subscribe((state) => {
    // Sincronizar Checkboxes de Actividades, Destinos y Ratings
    const checkboxes = container.querySelectorAll(".filter-checkbox-input") as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((cb) => {
      const val = cb.value;
      const group = cb.dataset.group as FilterGroup;
      if (group === "activities") {
        cb.checked = state.activities.includes(val);
      } else if (group === "destinations") {
        cb.checked = state.destinations.includes(val);
      } else if (group === "ratings") {
        cb.checked = state.ratings.includes(val);
      }
    });

    // Sincronizar campo de precio máximo
    const maxPriceInput = container.querySelector(".filter-price-input") as HTMLInputElement;
    if (maxPriceInput && document.activeElement !== maxPriceInput) {
      maxPriceInput.value = (state.maxPrice > 0 && state.maxPrice !== 700) ? String(state.maxPrice) : "";
    }
  });

  return container;
}
export type { FilterState };
