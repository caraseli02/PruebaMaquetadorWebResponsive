import type { Meta, StoryObj } from "@storybook/html";
import { Header } from "./Header";
import type { HeaderProps } from "./Header";

const meta: Meta<HeaderProps> = {
  title: "Organisms/Header",
  render: (args) => Header(args),
  argTypes: {
    logoSrc: { control: "text" },
    navLinks: { control: "object" },
    onLinkClick: { action: "nav-link-clicked" },
  },
};

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {
  args: {
    logoSrc: "logo-dark.svg", // Serves from local public/dev server
    navLinks: [
      { label: "Inicio", href: "#" },
      { label: "Cursos", href: "#cursos" },
      { label: "Nosotros", href: "#nosotros" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
};
