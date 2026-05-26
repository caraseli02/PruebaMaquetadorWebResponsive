import type { CardData } from "../types";
import bangkokImage from "../assets/Rectangle 50.png";
import desertImage from "../assets/Rectangle 50 (1).png";
import mountainImage from "../assets/Rectangle 50 (2).png";

/**
 * Mock database representing catalog course cards.
 */
export const mockCards: CardData[] = [
  {
    id: "course-1",
    title: "Descubre Bangkok con Iberojet",
    meta: "Tailandia, Asia · 9 días",
    tag: "Frontend",
    price: "248,00 €",
    imageUrl: bangkokImage,
    imageAlt: "Jardín y templo en Bangkok",
    rating: 4.9,
  },
  {
    id: "course-2",
    title: "Principios de Accesibilidad Web (WCAG 2.2)",
    meta: "Marruecos, África · 6 días",
    tag: "Accesibilidad",
    price: "189,00 €",
    imageUrl: desertImage,
    imageAlt: "Excursión por dunas en Marruecos",
    rating: 4.8,
  },
  {
    id: "course-3",
    title: "Arquitectura de Backend Escalable",
    meta: "España, Europa · 5 días",
    tag: "Backend",
    price: "320,00 €",
    imageUrl: mountainImage,
    imageAlt: "Vista de ciudad en montaña",
    rating: 4.6,
  },
  {
    id: "course-4",
    title: "Diseño UX/UI Avanzado para Móviles",
    meta: "Tailandia, Asia · 9 días",
    tag: "UX/UI",
    price: "248,00 €",
    imageUrl: bangkokImage,
    imageAlt: "Jardín y templo en Bangkok",
    rating: 4.9,
  },
  {
    id: "course-5",
    title: "Maquetación de Formularios Accesibles",
    meta: "Marruecos, África · 6 días",
    tag: "Accesibilidad",
    price: "189,00 €",
    imageUrl: desertImage,
    imageAlt: "Excursión por dunas en Marruecos",
    rating: 4.4,
  },
  {
    id: "course-6",
    title: "Sistemas Distribuidos y DevOps",
    meta: "España, Europa · 5 días",
    tag: "Backend",
    price: "320,00 €",
    imageUrl: mountainImage,
    imageAlt: "Vista de ciudad en montaña",
    rating: 4.5,
  }
];
