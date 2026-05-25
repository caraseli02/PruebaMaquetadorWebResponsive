import type { CardData } from "../types";

/**
 * Mock database representing catalog items (courses/trips) from Figma design frame.
 */
export const mockCards: CardData[] = [
  {
    id: "course-1",
    title: "Descubre Bangkok con Iberojet",
    description: "Aprende el arte de la maquetación responsiva con CSS Grid, Flexbox y Container Queries mientras exploras el sudeste asiático.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
    tags: ["Frontend", "UX/UI"],
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: "course-2",
    title: "Principios de Accesibilidad Web (WCAG 2.2)",
    description: "Domina el atrapado de foco, la tecla Escape, bloqueos de scroll y el elemento nativo <dialog> para interfaces usables.",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60",
    tags: ["Accesibilidad", "Frontend"],
    rating: 4.8,
    isFeatured: false,
  },
  {
    id: "course-3",
    title: "Arquitectura de Backend Escalable",
    description: "Aprende a diseñar APIs seguras, flujos de datos mediadores y bases de datos eficientes para tus aplicaciones.",
    imageUrl: "https://images.unsplash.com/photo-1516116211223-5c359a36298a?w=800&auto=format&fit=crop&q=60",
    tags: ["Backend"],
    rating: 4.6,
    isFeatured: false,
  },
  {
    id: "course-4",
    title: "Diseño UX/UI Avanzado para Móviles",
    description: "Alinea tipografías de impacto, palettes cromáticos refinados, micro-animaciones y layouts fluidos en interfaces premium.",
    imageUrl: "https://images.unsplash.com/photo-1541462608141-2ff580de097a?w=800&auto=format&fit=crop&q=60",
    tags: ["UX/UI"],
    rating: 4.7,
    isFeatured: true,
  },
  {
    id: "course-5",
    title: "Maquetación de Formularios Accesibles",
    description: "Crea entradas de texto, checboxes personalizados con vectores e indicadores focus-visible perfectos.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
    tags: ["Accesibilidad", "Frontend"],
    rating: 4.4,
    isFeatured: false,
  },
  {
    id: "course-6",
    title: "Sistemas Distribuidos y DevOps",
    description: "Automatiza flujos de integración, optimiza compilaciones y configura contenedores estables para producción.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    tags: ["Backend"],
    rating: 4.5,
    isFeatured: false,
  }
];
