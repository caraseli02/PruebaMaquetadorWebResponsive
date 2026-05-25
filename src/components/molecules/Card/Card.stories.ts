import type { Meta, StoryObj } from "@storybook/html";
import { Card } from "./Card";
import type { CardProps } from "./Card";

const meta: Meta<CardProps> = {
  title: "Molecules/Card",
  render: (args) => {
    // We wrap it in a resizeable container to demonstrate the Container Query
    const parent = document.createElement("div");
    parent.style.resize = "horizontal";
    parent.style.overflow = "auto";
    parent.style.padding = "var(--space-md)";
    parent.style.border = "1px dashed var(--color-border)";
    parent.style.backgroundColor = "var(--color-bg-main)";
    parent.style.width = "400px"; // Starts narrow
    parent.style.maxWidth = "800px";
    parent.style.minWidth = "280px";
    
    const info = document.createElement("p");
    info.style.fontSize = "var(--font-size-2xs)";
    info.style.color = "var(--color-text-muted)";
    info.style.marginBottom = "var(--space-xs)";
    info.style.fontFamily = "var(--font-sans)";
    info.innerHTML = "↔️ <strong>Arrastra el borde derecho</strong> para ver cómo cambia de diseño vertical a horizontal gracias a Container Queries!";
    parent.appendChild(info);
    
    const card = Card(args);
    parent.appendChild(card);
    
    return parent;
  },
  argTypes: {
    id: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    imageUrl: { control: "text" },
    tags: { control: "object" },
    rating: { control: "number" },
    isFeatured: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    id: "1",
    title: "Maquetación Web Responsive Avanzada",
    description: "Aprende los fundamentos de CSS Grid, Flexbox y Container Queries para maquetar interfaces pixel-perfect que se adapten fluidamente a cualquier dispositivo.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
    tags: ["Frontend", "CSS Grid", "Container Queries"],
    rating: 4.9,
    isFeatured: true,
  },
};

export const WithoutBadge: Story = {
  args: {
    id: "2",
    title: "Principios de Accesibilidad Web (WCAG 2.2)",
    description: "Asegura que tu sitio web sea usable para todas las personas. Aprende a gestionar focos, teclado, marcado semántico nativo y roles ARIA.",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60",
    tags: ["Accesibilidad", "a11y", "HTML5"],
    rating: 4.8,
    isFeatured: false,
  },
};
