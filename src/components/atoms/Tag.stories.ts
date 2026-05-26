import { createTag, type TagVariant } from "./Tag";
import { createStoryShell, createStorySurface } from "./storyUtils";

export default {
  title: "Atoms/Tag",
  parameters: {
    layout: "centered",
  },
};

type TagArgs = {
  label: string;
  variant: TagVariant;
};

export const Variants = () => {
  const container = createStoryShell("Tags");
  const surface = createStorySurface();
  surface.append(createTag({ label: "Quads", variant: "filled" }), createTag({ label: "Quads", variant: "soft" }));
  container.append(surface);
  return container;
};

export const Playground = {
  args: {
    label: "Quads",
    variant: "filled",
  } satisfies TagArgs,
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["filled", "soft"] },
  },
  render: (args: TagArgs) => {
    const container = createStoryShell("Tag playground");
    const surface = createStorySurface();
    surface.append(createTag(args));
    container.append(surface);
    return container;
  },
};
