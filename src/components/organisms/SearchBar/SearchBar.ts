import "./SearchBar.css";
import { createTextInput } from "../../atoms/TextInput";
import { createButton } from "../../atoms/Button";
import { TravelFilterState } from "../FilterPanel/TravelFilterState";

export interface SearchBarProps {
  filterState?: TravelFilterState;
  onSearch?: (searchState: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: string;
  }) => void;
}

/**
 * High-fidelity, responsive SearchBar organism featuring iconized input fields,
 * chevron drop triggers, a main search CTA button, and a visual summary banner.
 * Integra de forma reactiva el estado compartido a través del módulo TravelFilterState.
 */
export function createSearchBar({ filterState, onSearch }: SearchBarProps = {}): HTMLElement {
  const container = document.createElement("section");
  container.className = "search-bar";
  container.setAttribute("aria-label", "Barra de búsqueda de viajes");

  const card = document.createElement("div");
  card.className = "search-bar__card";

  // Field 1: Destino
  const destInput = createTextInput({
    label: "Destinos o experiencia",
    placeholder: "¿A dónde quieres ir?",
    icon: "compass",
    variant: "neutral",
  });
  destInput.classList.add("search-bar__input-wrapper");
  destInput.querySelector(".dux-text-input__field")?.setAttribute("aria-label", "Destino o experiencia");

  // Field 2: Fecha de ida
  const checkInInput = createTextInput({
    label: "Fecha de ida",
    placeholder: "Elige fecha",
    icon: "calendar",
    hasChevron: true,
    variant: "neutral",
  });
  checkInInput.classList.add("search-bar__input-wrapper");
  checkInInput.querySelector(".dux-text-input__field")?.setAttribute("aria-label", "Fecha de ida");

  // Field 3: Fecha de vuelta
  const checkOutInput = createTextInput({
    label: "Fecha de vuelta",
    placeholder: "Elige fecha",
    icon: "calendar",
    hasChevron: true,
    variant: "neutral",
  });
  checkOutInput.classList.add("search-bar__input-wrapper");
  checkOutInput.querySelector(".dux-text-input__field")?.setAttribute("aria-label", "Fecha de vuelta");

  // Field 4: Número de viajeros
  const guestsInput = createTextInput({
    label: "Número de viajeros",
    placeholder: "2 personas",
    icon: "users",
    hasChevron: true,
    variant: "neutral",
  });
  guestsInput.classList.add("search-bar__input-wrapper");
  guestsInput.querySelector(".dux-text-input__field")?.setAttribute("aria-label", "Número de viajeros");

  // Button: Buscar
  const searchBtn = createButton({
    label: "Buscar",
    variant: "plum",
    size: "lg",
  });
  searchBtn.classList.add("search-bar__btn");

  card.append(destInput, checkInInput, checkOutInput, guestsInput, searchBtn);
  container.appendChild(card);

  // Bottom Summary Panel
  const summaryPanel = document.createElement("div");
  summaryPanel.className = "search-bar__summary";

  const durationSummary = document.createElement("span");
  durationSummary.className = "search-bar__summary-item";
  const durationLabel = document.createElement("strong");
  durationLabel.textContent = "Duración:";
  durationSummary.append(durationLabel, " 9 días");

  const summaryDivider = document.createElement("span");
  summaryDivider.className = "search-bar__summary-divider";
  summaryDivider.setAttribute("aria-hidden", "true");
  summaryDivider.textContent = "|";

  const travelersSummary = document.createElement("span");
  travelersSummary.className = "search-bar__summary-item";
  const travelersLabel = document.createElement("strong");
  travelersLabel.textContent = "Viajeros:";
  travelersSummary.append(travelersLabel, " 2 personas");

  summaryPanel.append(durationSummary, summaryDivider, travelersSummary);
  container.appendChild(summaryPanel);

  // SUSCRIPCIÓN REACTIVA AL ESTADO PARA SINCRONIZACIÓN DE LA BÚSQUEDA
  if (filterState) {
    filterState.subscribe((state) => {
      const field = destInput.querySelector(".dux-text-input__field") as HTMLInputElement;
      if (field && document.activeElement !== field) {
        field.value = state.search;
      }
    });
  }

  // Wire search action
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const destField = destInput.querySelector(".dux-text-input__field") as HTMLInputElement;
    const destination = destField ? destField.value : "";

    if (filterState) {
      filterState.setSearch(destination);
    }

    if (onSearch) {
      const ciField = checkInInput.querySelector(".dux-text-input__field") as HTMLInputElement;
      const coField = checkOutInput.querySelector(".dux-text-input__field") as HTMLInputElement;
      const gField = guestsInput.querySelector(".dux-text-input__field") as HTMLInputElement;

      onSearch({
        destination,
        checkIn: ciField ? ciField.value : "",
        checkOut: coField ? coField.value : "",
        guests: gField ? gField.value : "",
      });
    }
  });

  return container;
}
