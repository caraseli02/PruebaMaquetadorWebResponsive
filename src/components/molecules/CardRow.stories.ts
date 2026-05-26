import { createStoryShell } from "../atoms/storyUtils";
import { createCardRow } from "./CardRow";

export default {
  title: "Molecules/CardRow",
  parameters: {
    layout: "centered",
  },
};

export const FigmaGrid = () => {
  const container = createStoryShell("Card row");
  const board = document.createElement("div");
  board.className = "molecule-board card-row-story";
  board.append(createCardRow());
  container.append(board);
  return container;
};
