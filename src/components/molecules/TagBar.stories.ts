import { createStoryShell } from "../atoms/storyUtils";
import { createTagBar } from "./TagBar";

export default {
  title: "Molecules/TagBar",
  parameters: {
    layout: "centered",
  },
};

export const FigmaSequence = () => {
  const container = createStoryShell("Tag bar");
  const board = document.createElement("div");
  board.className = "molecule-board tag-bar-story";
  board.append(createTagBar());
  container.append(board);
  return container;
};
