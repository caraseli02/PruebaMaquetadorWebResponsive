import { createTag } from "../atoms/Tag";

export type TagBarOptions = {
  labels?: string[];
  ariaLabel?: string;
};

export const figmaTagBarLabels = ["Quads", "Parapente", "Rafting", "Explora", "Buceo", "Surf", "Snowboard"];

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
