import type { Meta, StoryObj } from "@storybook/html";
import { Tooltip } from "./Tooltip";
import type { TooltipProps } from "./Tooltip";

const meta: Meta<TooltipProps> = {
  title: "Atoms/Tooltip",
  render: (args) => {
    const parent = document.createElement("div");
    parent.style.padding = "var(--space-5xl) var(--space-xl)";
    parent.style.display = "flex";
    parent.style.justifyContent = "center";
    parent.style.backgroundColor = "var(--color-bg-main)";
    
    parent.appendChild(Tooltip(args));
    return parent;
  },
  argTypes: {
    text: { control: "text" },
    triggerLabel: { control: "text" },
    triggerIcon: { control: "text" },
    cardMode: { control: "boolean" },
    cardTitle: { control: "text" },
    cardRows: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const HoverText: Story = {
  args: {
    text: "Esta opción incluye guías nativos bilingües y equipo completo.",
    triggerLabel: "Ver info",
    triggerIcon: "info",
    cardMode: false,
  },
};

export const PriceBreakdownCard: Story = {
  args: {
    triggerLabel: "Ver desglose",
    triggerIcon: "chevron-down",
    cardMode: true,
    cardTitle: "Desglose de precios",
    cardRows: [
      { label: "Precio base", value: "1.124,00 €" },
      { label: "Tasas aéreas", value: "150,42 €" },
      { label: "Impuesto ecológico", value: "4,43 €" },
      { label: "Precio final", value: "2.455,00 €", isTotal: true },
    ],
  },
};
