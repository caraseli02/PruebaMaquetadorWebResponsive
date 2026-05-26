export type SliderIndicatorOptions = {
  total?: number;
  activeIndex?: number;
  label?: string;
};

export const createSliderIndicator = ({
  total = 5,
  activeIndex = 0,
  label = "Posicion del carrusel",
}: SliderIndicatorOptions = {}): HTMLElement => {
  const indicator = document.createElement("div");
  indicator.className = "slider-indicator";
  indicator.setAttribute("role", "status");
  indicator.setAttribute("aria-label", `${label}: ${activeIndex + 1} de ${total}`);

  Array.from({ length: total }, (_, index) => {
    const dot = document.createElement("span");
    dot.className = `slider-indicator__dot${index === activeIndex ? " slider-indicator__dot--active" : ""}`;
    indicator.append(dot);
    return dot;
  });

  return indicator;
};
