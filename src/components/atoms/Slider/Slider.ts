import "./Slider.css";

export interface SliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  step?: number;
  label?: string;
  onChange?: (minVal: number, maxVal: number) => void;
  className?: string;
}

/**
 * Premium dual range Slider component designed in vanilla TypeScript/HTML.
 * Supports dual thumbs, custom track fills, price label formatting, and high accessibility.
 */
export function Slider({
  min = 0,
  max = 3000,
  minValue,
  maxValue,
  step = 10,
  label = "Rango de precios",
  onChange,
  className = "",
}: SliderProps): HTMLElement {
  const container = document.createElement("div");
  container.className = `slider-container ${className}`.trim();
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "var(--space-sm)";
  container.style.width = "100%";
  container.style.fontFamily = "var(--font-sans)";

  // Header Title Area
  const header = document.createElement("div");
  header.className = "slider-header";
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";

  const titleEl = document.createElement("span");
  titleEl.className = "slider-title";
  titleEl.style.fontSize = "var(--font-size-sm)";
  titleEl.style.fontWeight = "var(--weight-bold)";
  titleEl.style.color = "var(--color-text-main)";
  titleEl.style.textTransform = "uppercase";
  titleEl.style.letterSpacing = "0.05em";
  titleEl.textContent = label;
  header.appendChild(titleEl);

  // Label display showing: "248 € - 2.500 €"
  const valDisplay = document.createElement("span");
  valDisplay.className = "slider-value-display";
  valDisplay.style.fontSize = "var(--font-size-xs)";
  valDisplay.style.fontWeight = "var(--weight-semibold)";
  valDisplay.style.color = "var(--color-primary)";
  header.appendChild(valDisplay);

  container.appendChild(header);

  // Dual Range Workspace Container
  const rangeWrapper = document.createElement("div");
  rangeWrapper.className = "slider-range-wrapper";
  rangeWrapper.style.position = "relative";
  rangeWrapper.style.height = "24px";
  rangeWrapper.style.display = "flex";
  rangeWrapper.style.alignItems = "center";
  rangeWrapper.style.width = "100%";

  // Underlay Static Track Bar
  const track = document.createElement("div");
  track.className = "slider-track";
  track.style.position = "absolute";
  track.style.left = "0";
  track.style.right = "0";
  track.style.height = "6px";
  track.style.borderRadius = "var(--radius-full)";
  track.style.backgroundColor = "var(--color-border)";
  track.style.pointerEvents = "none";
  rangeWrapper.appendChild(track);

  // Active Segment Range Fill Bar
  const fill = document.createElement("div");
  fill.className = "slider-range-fill";
  fill.style.position = "absolute";
  fill.style.height = "6px";
  fill.style.borderRadius = "var(--radius-full)";
  fill.style.backgroundColor = "var(--color-primary)";
  fill.style.pointerEvents = "none";
  rangeWrapper.appendChild(fill);

  // Left Min Knob Range Input
  const inputMin = document.createElement("input");
  inputMin.type = "range";
  inputMin.className = "slider-input slider-input--min";
  inputMin.min = min.toString();
  inputMin.max = max.toString();
  inputMin.step = step.toString();
  inputMin.value = minValue.toString();
  inputMin.setAttribute("aria-label", "Precio mínimo");
  rangeWrapper.appendChild(inputMin);

  // Right Max Knob Range Input
  const inputMax = document.createElement("input");
  inputMax.type = "range";
  inputMax.className = "slider-input slider-input--max";
  inputMax.min = min.toString();
  inputMax.max = max.toString();
  inputMax.step = step.toString();
  inputMax.value = maxValue.toString();
  inputMax.setAttribute("aria-label", "Precio máximo");
  rangeWrapper.appendChild(inputMax);

  container.appendChild(rangeWrapper);

  // Min-Max limits label badges at bottom (e.g. "0 €" and "3.000 €")
  const limitsRow = document.createElement("div");
  limitsRow.className = "slider-limits";
  limitsRow.style.display = "flex";
  limitsRow.style.justifyContent = "space-between";
  limitsRow.style.marginTop = "calc(-1 * var(--space-2xs))";

  const minLimit = document.createElement("span");
  minLimit.className = "slider-limit-label";
  minLimit.style.fontSize = "var(--font-size-2xs)";
  minLimit.style.color = "var(--color-gray-500)";
  minLimit.textContent = `${min.toLocaleString("es-ES")} €`;
  limitsRow.appendChild(minLimit);

  const maxLimit = document.createElement("span");
  maxLimit.className = "slider-limit-label";
  maxLimit.style.fontSize = "var(--font-size-2xs)";
  maxLimit.style.color = "var(--color-gray-500)";
  maxLimit.textContent = `${max.toLocaleString("es-ES")} €`;
  limitsRow.appendChild(maxLimit);

  container.appendChild(limitsRow);

  // State calculation & redraw callback
  const syncSliders = () => {
    let currentMin = parseInt(inputMin.value, 10);
    let currentMax = parseInt(inputMax.value, 10);

    // Prevent thumbs crossing over or getting too close
    const minThreshold = step;
    if (currentMax - currentMin < minThreshold) {
      if (document.activeElement === inputMin) {
        currentMin = currentMax - minThreshold;
        inputMin.value = currentMin.toString();
      } else {
        currentMax = currentMin + minThreshold;
        inputMax.value = currentMax.toString();
      }
    }

    // Set interactive z-index to drag whichever knob is active
    if (currentMin > (max - min) / 2) {
      inputMin.style.zIndex = "5";
    } else {
      inputMin.style.zIndex = "3";
    }

    // Calculate percentages for filling active highlight track
    const minPercent = ((currentMin - min) / (max - min)) * 100;
    const maxPercent = ((currentMax - min) / (max - min)) * 100;

    fill.style.left = `${minPercent}%`;
    fill.style.width = `${maxPercent - minPercent}%`;

    // Render price value badges
    valDisplay.textContent = `${currentMin.toLocaleString("es-ES")} € - ${currentMax.toLocaleString("es-ES")} €`;

    if (onChange) {
      onChange(currentMin, currentMax);
    }
  };

  // Attach event listeners
  inputMin.addEventListener("input", syncSliders);
  inputMax.addEventListener("input", syncSliders);

  // Initialize display state
  syncSliders();

  return container;
}
