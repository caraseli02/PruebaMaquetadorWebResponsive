import type { CardData } from "../types";
import bangkokImage from "../assets/Rectangle 50.png";
import desertImage from "../assets/Rectangle 50 (1).png";
import mountainImage from "../assets/Rectangle 50 (2).png";

/**
 * Mock database representing high-fidelity catalog travel cards.
 */
export const mockCards: CardData[] = [
  {
    id: "travel-1",
    title: "Descubre Bangkok con Iberojet",
    location: "Tailandia",
    region: "Asia",
    durationDays: 9,
    tag: "Cultura",
    price: "248,00 €",
    imageUrl: bangkokImage,
    imageAlt: "Jardín y templo en Bangkok",
    rating: 4.9,
  },
  {
    id: "travel-2",
    title: "Aventura en Quads por las Dunas",
    location: "Marruecos",
    region: "África",
    durationDays: 6,
    tag: "Quads",
    price: "189,00 €",
    imageUrl: desertImage,
    imageAlt: "Excursión por dunas en Marruecos",
    rating: 4.8,
  },
  {
    id: "travel-3",
    title: "Ruta de Senderismo por los Picos",
    location: "España",
    region: "Europa",
    durationDays: 5,
    tag: "Senderismo",
    price: "320,00 €",
    imageUrl: mountainImage,
    imageAlt: "Vista de ciudad en montaña",
    rating: 4.6,
  },
  {
    id: "travel-4",
    title: "Surf y Relax en Playas del Sur",
    location: "Tailandia",
    region: "Asia",
    durationDays: 8,
    tag: "Surf",
    price: "410,00 €",
    imageUrl: bangkokImage,
    imageAlt: "Playas paradisíacas de Tailandia",
    rating: 4.9,
  },
  {
    id: "travel-5",
    title: "Safari Fotográfico Salvaje",
    location: "Kenia",
    region: "África",
    durationDays: 10,
    tag: "Safari",
    price: "480,00 €",
    imageUrl: desertImage,
    imageAlt: "Safari en Kenia",
    rating: 4.4,
  },
  {
    id: "travel-6",
    title: "Crucero Fluvial y Escapada Rural",
    location: "España",
    region: "Europa",
    durationDays: 4,
    tag: "Crucero",
    price: "299,00 €",
    imageUrl: mountainImage,
    imageAlt: "Crucero por río español",
    rating: 4.5,
  }
];
