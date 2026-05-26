import { createStoryShell } from "../../atoms/storyUtils";
import { createCardsGrid } from "./CardsGrid";
import { mockCards } from "../../../data/cards";

export default {
  title: "Organisms/CardsGrid",
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => {
  const container = createStoryShell("Organism / Elastic Cards Grid");
  container.style.width = "100%";
  container.style.maxWidth = "1208px";
  const grid = createCardsGrid({ cards: mockCards });
  container.append(grid);
  return container;
};

export const Empty = () => {
  const container = createStoryShell("Organism / Cards Grid (No Results Empty State)");
  container.style.width = "100%";
  container.style.maxWidth = "900px";
  const grid = createCardsGrid({ cards: [] });
  container.append(grid);
  return container;
};
