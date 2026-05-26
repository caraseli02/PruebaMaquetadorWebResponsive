import { createCircuitCardGridTitle } from "./CircuitCardGridTitle";
import { createStoryShell, createStorySurface } from "./storyUtils";

export default {
  title: "Atoms/CircuitCardGridTitle",
  parameters: {
    layout: "centered",
  },
};

type TitleArgs = {
  text: string;
};

export const Examples = () => {
  const container = createStoryShell("Titles");
  const surface = createStorySurface();
  surface.append(createCircuitCardGridTitle({ text: "Asia" }));
  container.append(surface);
  return container;
};

export const Playground = {
  args: {
    text: "Asia",
  } satisfies TitleArgs,
  argTypes: {
    text: { control: "text" },
  },
  render: (args: TitleArgs) => {
    const container = createStoryShell("Title playground");
    const surface = createStorySurface();
    surface.append(createCircuitCardGridTitle(args));
    container.append(surface);
    return container;
  },
};
