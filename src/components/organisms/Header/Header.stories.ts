import { createStoryShell } from "../../atoms/storyUtils";
import { createHeader } from "./Header";

export default {
  title: "Organisms/Header",
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => {
  const container = createStoryShell("Organism / Header (Responsive)");
  const header = createHeader();
  container.append(header);
  return container;
};
