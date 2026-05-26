export const createStoryShell = (title: string): HTMLElement => {
  const container = document.createElement("section");
  container.className = "atom-story";

  const heading = document.createElement("h2");
  heading.className = "atom-story__title";
  heading.textContent = title;
  container.append(heading);

  return container;
};

export const createStorySurface = (): HTMLElement => {
  const surface = document.createElement("div");
  surface.className = "atom-story__surface";
  return surface;
};
