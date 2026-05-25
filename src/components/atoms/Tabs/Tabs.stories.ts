import type { Meta, StoryObj } from "@storybook/html";
import { Tabs } from "./Tabs";
import type { TabsProps } from "./Tabs";

const meta: Meta<TabsProps> = {
  title: "Atoms/Tabs",
  render: (args) => Tabs(args),
  argTypes: {
    items: { control: "object" },
    variant: {
      control: "select",
      options: ["underline", "pill"],
    },
    onTabChange: { action: "tab-changed" },
  },
};

export default meta;
type Story = StoryObj<TabsProps>;

export const UnderlineWithIcons: Story = {
  args: {
    variant: "underline",
    items: [
      { id: "1", label: "Aventura", iconName: "mountain", active: true },
      { id: "2", label: "Destinos", iconName: "pin", active: false },
      { id: "3", label: "Alojamiento", iconName: "home", active: false },
      { id: "4", label: "Sobre nosotros", iconName: "user", active: false },
    ],
  },
};

export const SegmentedPill: Story = {
  args: {
    variant: "pill",
    items: [
      { id: "1", label: "Vista Lista", active: true },
      { id: "2", label: "Vista Mapa", active: false },
    ],
  },
};
