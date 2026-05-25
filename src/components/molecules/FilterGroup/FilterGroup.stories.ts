import type { Meta, StoryObj } from "@storybook/html";
import { FilterGroup } from "./FilterGroup";
import type { FilterGroupProps } from "./FilterGroup";

const meta: Meta<FilterGroupProps> = {
  title: "Molecules/FilterGroup",
  render: (args) => FilterGroup(args),
  argTypes: {
    title: { control: "text" },
    items: { control: "object" },
    layout: {
      control: "select",
      options: ["column", "row"],
    },
    onChange: { action: "filter-selection-changed" },
  },
};

export default meta;
type Story = StoryObj<FilterGroupProps>;

export const CategoriesColumn: Story = {
  args: {
    title: "Áreas de Estudio",
    layout: "column",
    items: [
      { label: "Diseño Web", checked: false },
      { label: "Frontend", checked: true },
      { label: "Backend", checked: false },
      { label: "Accesibilidad", checked: true },
      { label: "Sistemas / DevOps", checked: false },
    ],
  },
};

export const TagsRow: Story = {
  args: {
    title: "Etiquetas Rápidas",
    layout: "row",
    items: [
      { label: "HTML5", checked: false },
      { label: "CSS3", checked: true },
      { label: "Flexbox", checked: false },
      { label: "Grid", checked: false },
      { label: "TypeScript", checked: true },
    ],
  },
};
