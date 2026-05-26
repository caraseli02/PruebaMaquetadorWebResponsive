import { createStoryShell } from "../atoms/storyUtils";
import { createPricingPopover } from "./Popover";

export default {
  title: "Molecules/Popover",
  parameters: {
    layout: "centered",
  },
};

export const PriceBreakdown = () => {
  const container = createStoryShell("Popover / Desglose de precio");
  const board = document.createElement("div");
  board.className = "molecule-board popover-story";

  board.append(createPricingPopover({ price: "248,00 €" }));
  container.append(board);

  return container;
};
