import { createStoryShell } from "../../atoms/storyUtils";
import { createFilterPanel } from "./FilterPanel";

export default {
  title: "Organisms/FilterPanel",
  parameters: {
    layout: "centered",
  },
};

export const Sidebar = () => {
  const container = createStoryShell("Organism / Filter Panel (Sidebar Mode)");
  container.style.width = "300px";
  const filterPanel = createFilterPanel();
  container.append(filterPanel);
  return container;
};

export const DialogMobile = () => {
  const container = createStoryShell("Organism / Filter Panel (Mobile Dialog Modal)");
  
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
