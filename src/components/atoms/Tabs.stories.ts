import { createTabs } from "./Tabs";
import { createStoryShell } from "./storyUtils";

export default {
  title: "Atoms/Tabs",
  parameters: {
    layout: "centered",
  },
};

type TabsArgs = {
  activeIndex: number;
};

export const Level1 = () => {
  const container = createStoryShell("Tabs");
  container.append(createTabs());
  return container;
};

export const Playground = {
  args: {
    activeIndex: 0,
  } satisfies TabsArgs,
  argTypes: {
    activeIndex: { control: { type: "number", min: 0, max: 3, step: 1 } },
  },
  render: (args: TabsArgs) => {
    const container = createStoryShell("Tabs playground");
    container.append(createTabs({ activeIndex: args.activeIndex }));
    return container;
  },
};
