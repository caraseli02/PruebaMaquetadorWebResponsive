import type { Meta, StoryObj } from "@storybook/html";
import { Icon } from "./Icon";
import type { IconProps } from "./Icon";
import { icons } from "./icons";

const meta: Meta<IconProps> = {
  title: "Atoms/Icon",
  render: (args) => Icon(args),
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(icons),
    },
    color: { control: "color" },
    size: { control: { type: "number", min: 12, max: 64, step: 2 } },
  },
};

export default meta;
type Story = StoryObj<IconProps>;

export const Default: Story = {
  args: {
    name: "search",
    size: 24,
  },
};

export const Filter: Story = {
  args: {
    name: "filter",
    size: 24,
    color: "var(--color-primary)",
  },
};

export const AllIcons: Meta = {
  render: () => {
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(100px, 1fr))";
    grid.style.gap = "var(--space-md)";
    grid.style.padding = "var(--space-md)";
    grid.style.fontFamily = "var(--font-sans)";
    
    Object.keys(icons).forEach((key) => {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.alignItems = "center";
      wrapper.style.justifyContent = "center";
      wrapper.style.padding = "var(--space-sm)";
      wrapper.style.border = "1px solid var(--color-border)";
      wrapper.style.borderRadius = "var(--radius-md)";
      wrapper.style.backgroundColor = "var(--color-bg-card)";
      
      const icon = Icon({ name: key as any, size: 24 });
      wrapper.appendChild(icon);
      
      const label = document.createElement("span");
      label.textContent = key;
      label.style.fontSize = "var(--font-size-2xs)";
      label.style.marginTop = "var(--space-xs)";
      label.style.color = "var(--color-text-muted)";
      wrapper.appendChild(label);
      
      grid.appendChild(wrapper);
    });
    
    return grid;
  },
};
