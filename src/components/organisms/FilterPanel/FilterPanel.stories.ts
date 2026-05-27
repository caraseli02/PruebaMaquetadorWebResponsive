import { createFilterPanel } from "./FilterPanel";
import "./FilterPanel.stories.css";

export default {
  title: "Organisms/FilterPanel",
  parameters: {
    layout: "fullscreen",
  },
};

export const Sidebar = () => {
  const story = document.createElement("section");
  story.className = "filter-story";

  const title = document.createElement("h1");
  title.className = "filter-story__title";
  title.textContent = "Filters";

  const surface = document.createElement("div");
  surface.className = "filter-story__surface";

  const frame = document.createElement("div");
  frame.className = "filter-story__frame";
  frame.append(
    createFilterPanel({
      initialState: {
        search: "",
        destinations: [],
        activities: ["Parapente", "Explora"],
        maxPrice: 700,
        ratings: [],
      },
    })
  );

  surface.append(frame);
  story.append(title, surface);
  return story;
};

export const Default = Sidebar;

export const DialogMobile = () => {
  const container = document.createElement("section");
  container.className = "atom-story";
  
  const openBtn = document.createElement("button");
  openBtn.className = "dux-button dux-button--orange";
  openBtn.textContent = "Abrir modal de filtros";
  
  const dialog = createFilterPanel({
    dialogMode: true,
  }) as HTMLDialogElement;
  
  openBtn.addEventListener("click", () => {
    dialog.showModal();
  });
  
  container.append(openBtn, dialog);
  return container;
};
