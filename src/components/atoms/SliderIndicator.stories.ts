import { createSliderIndicator } from "./SliderIndicator";
import { createStoryShell } from "./storyUtils";

export default {
  title: "Atoms/SliderIndicator",
  parameters: {
    layout: "centered",
  },
};

type SliderIndicatorArgs = {
  total: number;
  activeIndex: number;
};

export const Positions = () => {
  const container = createStoryShell("Slider indicator");
  const board = document.createElement("div");
  board.className = "slider-indicator-board";

  [0, 1, 2, 0, 1, 2].forEach((activeIndex) => {
    board.append(createSliderIndicator({ total: 6, activeIndex }));
    return activeIndex;
  });

  container.append(board);
  return container;
};

export const Playground = {
  args: {
    total: 5,
    activeIndex: 2,
  } satisfies SliderIndicatorArgs,
  argTypes: {
    total: { control: { type: "number", min: 2, max: 8, step: 1 } },
    activeIndex: { control: { type: "number", min: 0, max: 7, step: 1 } },
  },
  render: (args: SliderIndicatorArgs) => {
    const container = createStoryShell("Slider indicator playground");
    const board = document.createElement("div");
    board.className = "slider-indicator-board";
    board.append(createSliderIndicator({ total: args.total, activeIndex: Math.min(args.activeIndex, args.total - 1) }));
    container.append(board);
    return container;
  },
};
