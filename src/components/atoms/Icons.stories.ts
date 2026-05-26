import { createIcon, type IconName } from "./Icon";
import { createStoryShell } from "./storyUtils";

export default {
  title: "Atoms/Icons",
  parameters: {
    layout: "centered",
  },
};

const iconGrid: Array<{ name: IconName; label: string }> = [
  { name: "chevronRight", label: "ChevronRight" },
  { name: "menu", label: "Menu" },
  { name: "close", label: "Close" },
  { name: "heart", label: "Heart" },
  { name: "landscape", label: "Landscape" },
  { name: "compass", label: "Compass" },
  { name: "printer", label: "Printer" },
  { name: "activity", label: "Activity" },
  { name: "globe", label: "Globe" },
  { name: "home", label: "Home" },
  { name: "chevronLeft", label: "ChevronLeft" },
  { name: "triangleDown", label: "TriangleDown" },
  { name: "calendar", label: "Calendar" },
  { name: "users", label: "Users" },
  { name: "tag", label: "Tag" },
  { name: "tagTilt", label: "Tag Tilt" },
  { name: "chevronDown", label: "ChevronDown" },
  { name: "chevronDownCompact", label: "ChevronDown Compact" },
];

export const Grid = () => {
  const container = createStoryShell("Icons");
  const grid = document.createElement("div");
  grid.className = "icon-grid";

  iconGrid.forEach(({ name, label }) => {
    const item = document.createElement("div");
    item.className = "icon-grid__item";
    item.append(createIcon({ name, size: 24, title: label }));

    grid.append(item);
  });

  container.append(grid);
  return container;
};
