import type { Meta, StoryObj } from "@storybook/html";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  title: "Atoms/Button",
  render: (args) => Button(args),
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
    },
    disabled: { control: "boolean" },
    iconOnly: { control: "boolean" },
    circle: { control: "boolean" },
    iconName: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    label: "Aceptar",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Guardar",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    label: "Cancelar",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    label: "Editar",
    variant: "ghost",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Buscar",
    variant: "primary",
    iconName: "search",
  },
};

export const IconOnly: Story = {
  args: {
    variant: "outline",
    iconOnly: true,
    iconName: "filter",
    ariaLabel: "Filtrar resultados",
  },
};

export const FloatingActionButton: Story = {
  args: {
    variant: "primary",
    iconOnly: true,
    circle: true,
    iconName: "filter",
    ariaLabel: "Abrir filtros flotantes",
  },
};
