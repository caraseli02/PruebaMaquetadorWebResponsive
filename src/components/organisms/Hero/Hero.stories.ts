import { createHero } from "./Hero";

export default {
  title: "Organisms/Hero",
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => {
  const board = document.createElement("div");
  board.className = "hero-story-board";

  const desktop = createHero();
  desktop.classList.add("hero-story-board__desktop");

  const tablet = createHero();
  tablet.classList.add("hero-story-board__tablet");

  const mobile = createHero();
  mobile.classList.add("hero-story-board__mobile");

  board.append(desktop, tablet, mobile);
  return board;
};
