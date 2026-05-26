import { createStoryShell } from "../atoms/storyUtils";
import { createFooterContent } from "./FooterContent";

export default {
  title: "Molecules/FooterContent",
  parameters: {
    layout: "centered",
  },
};

export const FigmaStack = () => {
  const container = createStoryShell("Footer content");
  const board = document.createElement("div");
  board.className = "molecule-board footer-content-story";

  board.append(
    createFooterContent(),
    createFooterContent(),
    createFooterContent({ socialLayout: "spread" }),
  );

  container.append(board);
  return container;
};
