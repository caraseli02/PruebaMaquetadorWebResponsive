import { createStoryShell } from "../../atoms/storyUtils";
import { createSearchBar } from "./SearchBar";

export default {
  title: "Organisms/SearchBar",
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => {
  const container = createStoryShell("Organism / SearchBar (Responsive)");
  const searchBar = createSearchBar();
  container.append(searchBar);
  return container;
};
