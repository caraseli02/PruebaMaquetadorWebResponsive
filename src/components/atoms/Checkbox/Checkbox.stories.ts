import type { Meta, StoryObj } from "@storybook/html";
import { Checkbox } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox";

const meta: Meta<CheckboxProps> = {
  title: "Atoms/Checkbox",
  render: (args) => Checkbox(args),
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "checked-changed" },
  },
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Unchecked: Story = {
  args: {
    label: "Desarrollo Frontend",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Diseño UX/UI",
    checked: true,
  },
};
