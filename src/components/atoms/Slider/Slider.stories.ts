import type { Meta, StoryObj } from "@storybook/html";
import { Slider } from "./Slider";
import type { SliderProps } from "./Slider";

const meta: Meta<SliderProps> = {
  title: "Atoms/Slider",
  render: (args) => Slider(args),
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    minValue: { control: "number" },
    maxValue: { control: "number" },
    step: { control: "number" },
    label: { control: "text" },
    onChange: { action: "slider-range-changed" },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0PM0v0yCjLQ7HDZSdCIvjE/Prueba-Acceso-DUX--Copy-?node-id=2005-3756&t=7HdwLNPVbcfrAhBg-0",
    },
  },
};

export default meta;
type Story = StoryObj<SliderProps>;

export const PriceRange: Story = {
  args: {
    min: 0,
    max: 3000,
    minValue: 248,
    maxValue: 2455,
    step: 10,
    label: "RANGO DE PRECIOS",
  },
};

export const NarrowRange: Story = {
  args: {
    min: 100,
    max: 1000,
    minValue: 300,
    maxValue: 800,
    step: 5,
    label: "FILTRADO CORTO",
  },
};
