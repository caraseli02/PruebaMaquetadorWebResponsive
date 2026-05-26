export type CircuitCardGridTitleOptions = {
  text?: string;
};

export const createCircuitCardGridTitle = ({ text = "Asia" }: CircuitCardGridTitleOptions = {}): HTMLElement => {
  const title = document.createElement("h2");
  title.className = "circuit-card-grid-title";
  title.textContent = text;
  return title;
};
