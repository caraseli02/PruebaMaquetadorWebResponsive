import "./SearchBar.css";
import { createTextInput } from "../../atoms/TextInput";
import { createButton } from "../../atoms/Button";

export interface SearchBarProps {
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
 */
export function createSearchBar({ onSearch }: SearchBarProps = {}): HTMLElement {
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
  summaryPanel.innerHTML = `
    <span class="search-bar__summary-item">
      <strong>Duración:</strong> 9 días
    </span>
    <span class="search-bar__summary-divider" aria-hidden="true">|</span>
    <span class="search-bar__summary-item">
      <strong>Viajeros:</strong> 2 personas
    </span>
  `;
  container.appendChild(summaryPanel);

  // Wire search action
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (onSearch) {
      const destField = destInput.querySelector(".dux-text-input__field") as HTMLInputElement;
      const ciField = checkInInput.querySelector(".dux-text-input__field") as HTMLInputElement;
      const coField = checkOutInput.querySelector(".dux-text-input__field") as HTMLInputElement;
      const gField = guestsInput.querySelector(".dux-text-input__field") as HTMLInputElement;

      onSearch({
        destination: destField ? destField.value : "",
        checkIn: ciField ? ciField.value : "",
        checkOut: coField ? coField.value : "",
        guests: gField ? gField.value : "",
      });
    }
  });

  return container;
}
