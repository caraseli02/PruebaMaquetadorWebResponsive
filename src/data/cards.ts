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
    meta: '<strong class="circuit-card__meta-location">Tailandia, Asia</strong> · 9 días',
    tag: "Cultura",
    price: "248,00 €",
    imageUrl: bangkokImage,
    imageAlt: "Jardín y templo en Bangkok",
    rating: 4.9,
  },
  {
    id: "travel-2",
    title: "Aventura en Quads por las Dunas",
    meta: '<strong class="circuit-card__meta-location">Marruecos, África</strong> · 6 días',
    tag: "Quads",
    price: "189,00 €",
    imageUrl: desertImage,
    imageAlt: "Excursión por dunas en Marruecos",
    rating: 4.8,
  },
  {
    id: "travel-3",
    title: "Ruta de Senderismo por los Picos",
    meta: '<strong class="circuit-card__meta-location">España, Europa</strong> · 5 días',
    tag: "Senderismo",
    price: "320,00 €",
    imageUrl: mountainImage,
    imageAlt: "Vista de ciudad en montaña",
    rating: 4.6,
  },
  {
    id: "travel-4",
    title: "Surf y Relax en Playas del Sur",
    meta: '<strong class="circuit-card__meta-location">Tailandia, Asia</strong> · 8 días',
    tag: "Surf",
    price: "410,00 €",
    imageUrl: bangkokImage,
    imageAlt: "Playas paradisíacas de Tailandia",
    rating: 4.9,
  },
  {
    id: "travel-5",
    title: "Safari Fotográfico Salvaje",
    meta: '<strong class="circuit-card__meta-location">Kenia, África</strong> · 10 días',
    tag: "Safari",
    price: "480,00 €",
    imageUrl: desertImage,
    imageAlt: "Safari en Kenia",
    rating: 4.4,
  },
  {
    id: "travel-6",
    title: "Crucero Fluvial y Escapada Rural",
    meta: '<strong class="circuit-card__meta-location">España, Europa</strong> · 4 días',
    tag: "Crucero",
    price: "299,00 €",
    imageUrl: mountainImage,
    imageAlt: "Crucero por río español",
    rating: 4.5,
  }
];
