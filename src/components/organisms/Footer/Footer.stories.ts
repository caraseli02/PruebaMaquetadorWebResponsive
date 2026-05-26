import { createStoryShell } from "../../atoms/storyUtils";
import { createFooter } from "./Footer";

export default {
  title: "Organisms/Footer",
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => {
  const container = createStoryShell("Organism / Footer Section (Dark Mode)");
  const footer = createFooter();
  container.append(footer);
  return container;
};
