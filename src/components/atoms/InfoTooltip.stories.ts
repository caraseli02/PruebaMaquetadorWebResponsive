import { createInfoTooltip } from "./InfoTooltip";
import { createStoryShell, createStorySurface } from "./storyUtils";

export default {
  title: "Atoms/InfoTooltip",
  parameters: {
    layout: "centered",
  },
};

type TooltipArgs = {
  text: string;
  visible: boolean;
};

export const States = () => {
  const container = createStoryShell("Info tooltip");
  const surface = createStorySurface();
  surface.classList.add("info-tooltip-story");
  surface.append(createInfoTooltip({ visible: true }));
  container.append(surface);
  return container;
};

export const Playground = {
  args: {
    text: "Información detallada sobre esta sección de aventura",
    visible: true,
  } satisfies TooltipArgs,
  argTypes: {
    text: { control: "text" },
    visible: { control: "boolean" },
  },
  render: (args: TooltipArgs) => {
    const container = createStoryShell("Info tooltip playground");
    const surface = createStorySurface();
    surface.classList.add("info-tooltip-story");
    surface.append(createInfoTooltip(args));
    container.append(surface);
    return container;
  },
};
