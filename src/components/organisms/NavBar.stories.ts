import { createHeader } from "./Header/Header";
import "./Header/Header.stories.css";

export default {
  title: "Organisms/Nav Bar",
  parameters: {
    layout: "fullscreen",
  },
};

const createStoryHeader = (className: string) => {
  const header = createHeader();
  header.classList.add(className);
  return header;
};

export const Default = () => {
  const board = document.createElement("section");
  board.className = "nav-bar-story";

  board.append(
    createStoryHeader("nav-bar-story__desktop"),
    createStoryHeader("nav-bar-story__tablet"),
    createStoryHeader("nav-bar-story__mobile"),
    createStoryHeader("nav-bar-story__compact")
  );

  return board;
};

export const MobileOpen = () => {
  const header = createHeader();
  header.classList.add("nav-bar-story__mobile");
  header.querySelector<HTMLButtonElement>(".header__toggle")?.click();
  return header;
};
