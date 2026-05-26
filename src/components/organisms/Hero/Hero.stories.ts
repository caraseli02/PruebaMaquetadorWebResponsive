import { createStoryShell } from "../../atoms/storyUtils";
import { createHero } from "./Hero";

export default {
  title: "Organisms/Hero",
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => {
  const container = createStoryShell("Organism / Hero Banner (Fluid Typography)");
  const hero = createHero();
  container.append(hero);
  return container;
};
