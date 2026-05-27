export type SliderIndicatorOptions = {
  total?: number;
  activeIndex?: number;
  label?: string;
  onDotClick?: (index: number) => void;
};

export const createSliderIndicator = ({
  total = 5,
  activeIndex = 0,
  label = "Posición del carrusel",
  onDotClick,
}: SliderIndicatorOptions = {}): HTMLElement => {
  const indicator = document.createElement("div");
  indicator.className = "slider-indicator";
  indicator.setAttribute("role", "group");
  indicator.setAttribute("aria-label", `${label}: ${activeIndex + 1} de ${total}`);

  Array.from({ length: total }, (_, index) => {
    const isButton = typeof onDotClick === "function";
    const dot = document.createElement(isButton ? "button" : "span");

    if (isButton) {
      const btn = dot as HTMLButtonElement;
      btn.type = "button";
      btn.setAttribute("aria-label", `Ir a diapositiva ${index + 1}`);
      if (index === activeIndex) {
        btn.setAttribute("aria-current", "true");
      }
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        onDotClick(index);
      });
    }

    dot.className = `slider-indicator__dot${index === activeIndex ? " slider-indicator__dot--active" : ""}`;
    indicator.append(dot);
    return dot;
  });

  return indicator;
};
