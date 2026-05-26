import { createTag } from "../atoms/Tag";

export type TagBarOptions = {
  labels?: string[];
  ariaLabel?: string;
};

export const figmaTagBarLabels = ["Lorem ipsum", "Lorem", "Ipsum", "Lorem ipsum", "Lorem", "Ipsum"];

export const createTagBar = ({
  labels = figmaTagBarLabels,
  ariaLabel = "Categorías",
}: TagBarOptions = {}): HTMLElement => {
  const nav = document.createElement("nav");
  nav.className = "tag-bar";
  nav.setAttribute("aria-label", ariaLabel);

  labels.forEach((label) => {
    nav.append(createTag({ label, variant: "soft" }));
  });

  return nav;
};
