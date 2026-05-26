import { createStoryShell } from "../atoms/storyUtils";
import { createBottomBarCircuitCard } from "./BottomBarCircuitCard";

export default {
  title: "Molecules/BottomBarCircuitCard",
  parameters: {
    layout: "centered",
  },
};



export const FigmaVariants = () => {
  const container = createStoryShell("Card content / bottom bar");
  const board = document.createElement("div");
  board.className = "molecule-board bottom-bar-circuit-card-story";

  board.append(createBottomBarCircuitCard({ layout: "inline" }));
  board.append(createBottomBarCircuitCard({ layout: "inline", eyebrow: "", detailsLabel: "" }));
  board.append(createBottomBarCircuitCard({ layout: "wide" }));
  board.append(createBottomBarCircuitCard({ layout: "stacked" }));

  container.append(board);
  return container;
};
