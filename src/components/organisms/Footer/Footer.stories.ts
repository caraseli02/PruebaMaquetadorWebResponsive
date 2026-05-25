import type { Meta, StoryObj } from "@storybook/html";
import { Footer } from "./Footer";
import type { FooterProps } from "./Footer";

const meta: Meta<FooterProps> = {
  title: "Organisms/Footer",
  render: (args) => Footer(args),
  argTypes: {
    logoSrc: { control: "text" },
    brandText: { control: "text" },
    copyrightText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<FooterProps>;

export const Default: Story = {
  args: {
    logoSrc: "logo-light.svg",
    brandText: "Plataforma educativa líder en desarrollo web fluido, interactivo y accesible de alta fidelidad.",
  },
};
