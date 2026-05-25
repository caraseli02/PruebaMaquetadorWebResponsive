import type { Meta, StoryObj } from "@storybook/html";
import { Tag } from "./Tag";
import type { TagProps } from "./Tag";

const meta: Meta<TagProps> = {
  title: "Atoms/Tag",
  render: (args) => Tag(args),
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "featured", "outline"],
    },
    round: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<TagProps>;

export const PrimaryOrange: Story = {
  args: {
    label: "Quads",
    variant: "primary",
    round: true,
  },
};

export const SecondaryPurple: Story = {
  args: {
    label: "Marruecos, África",
    variant: "secondary",
  },
};

export const FeaturedBadge: Story = {
  args: {
    label: "Destacado",
    variant: "featured",
    round: true,
  },
};

export const Outline: Story = {
  args: {
    label: "9 días",
    variant: "outline",
  },
};
