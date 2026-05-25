import type { Meta, StoryObj } from "@storybook/html";
import { Hero } from "./Hero";
import type { HeroProps } from "./Hero";

const meta: Meta<HeroProps> = {
  title: "Organisms/Hero",
  render: (args) => Hero(args),
  argTypes: {
    titleHtml: { control: "text" },
    description: { control: "text" },
    primaryCtaLabel: { control: "text" },
    secondaryCtaLabel: { control: "text" },
    onPrimaryClick: { action: "primary-clicked" },
    onSecondaryClick: { action: "secondary-clicked" },
  },
};

export default meta;
type Story = StoryObj<HeroProps>;

export const Default: Story = {
  args: {
    titleHtml: "Domina el desarrollo con <span>diseño fluido</span> y accesible",
    description: "Aprende a maquetar sitios web modernos usando CSS Grid, Flexbox, y Container Queries. Crea interfaces accesibles que cautivan a tus usuarios y se adaptan a cualquier pantalla de forma nativa.",
    primaryCtaLabel: "Explorar Cursos",
    secondaryCtaLabel: "Saber Más",
  },
};
