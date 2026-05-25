import type { Meta, StoryObj } from "@storybook/html";
import { TextInput } from "./TextInput";
import type { TextInputProps } from "./TextInput";

const meta: Meta<TextInputProps> = {
  title: "Atoms/TextInput",
  render: (args) => TextInput(args),
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
    iconName: { control: "text" },
    onChange: { action: "input-changed" },
  },
};

export default meta;
type Story = StoryObj<TextInputProps>;

export const Default: Story = {
  args: {
    placeholder: "Escribe algo...",
  },
};

export const WithSearchIcon: Story = {
  args: {
    placeholder: "Buscar cursos, artículos...",
    iconName: "search",
  },
};

export const Prepopulated: Story = {
  args: {
    placeholder: "Buscar...",
    value: "Diseño Web",
    iconName: "search",
  },
};
