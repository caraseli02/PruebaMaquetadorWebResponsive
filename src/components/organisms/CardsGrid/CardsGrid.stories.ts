import type { Meta, StoryObj } from "@storybook/html";
import { CardsGrid } from "./CardsGrid";
import type { CardsGridProps } from "./CardsGrid";

const mockCards = [
  {
    id: "1",
    title: "Maquetación Web Responsive Avanzada",
    description: "Aprende los fundamentos de CSS Grid, Flexbox y Container Queries para maquetar interfaces pixel-perfect.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60",
    tags: ["Frontend", "CSS Grid"],
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Principios de Accesibilidad Web (WCAG 2.2)",
    description: "Asegura que tu sitio web sea usable para todas las personas. Aprende a gestionar focos, teclado y ARIA.",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format&fit=crop&q=60",
    tags: ["Accesibilidad", "a11y"],
    rating: 4.8,
    isFeatured: false,
  },
  {
    id: "3",
    title: "TypeScript para Desarrolladores Frontend",
    description: "Domina el tipado estricto, interfaces, genéricos y programación orientada a objetos en proyectos modernos.",
    imageUrl: "https://images.unsplash.com/photo-1516116211223-5c359a36298a?w=600&auto=format&fit=crop&q=60",
    tags: ["Frontend", "TypeScript"],
    rating: 4.7,
    isFeatured: false,
  },
];

const meta: Meta<CardsGridProps> = {
  title: "Organisms/CardsGrid",
  render: (args) => {
    const parent = document.createElement("div");
    parent.style.padding = "var(--space-md)";
    parent.style.backgroundColor = "var(--color-bg-main)";
    parent.appendChild(CardsGrid(args));
    return parent;
  },
  argTypes: {
    cards: { control: "object" },
    onCardClick: { action: "card-clicked" },
  },
};

export default meta;
type Story = StoryObj<CardsGridProps>;

export const DefaultGrid: Story = {
  args: {
    cards: mockCards,
  },
};

export const EmptyState: Story = {
  args: {
    cards: [],
  },
};
