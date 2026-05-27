import type { CardData } from "../types";
import bangkokImage from "../assets/Rectangle 50.png";
import desertImage from "../assets/Rectangle 50 (1).png";
import mountainImage from "../assets/Rectangle 50 (2).png";
import surfImage from "../assets/surf.png";
import safariImage from "../assets/safari.png";
import cruiseImage from "../assets/cruise.png";

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
    imageUrl: surfImage,
    imageAlt: "Surfistas en una playa tropical paradisíaca en Tailandia",
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
    imageUrl: safariImage,
    imageAlt: "Elefantes y jirafas caminando en la sabana de Kenia al atardecer",
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
    imageUrl: cruiseImage,
    imageAlt: "Un crucero fluvial moderno navegando por un río pintoresco en un valle verde",
    rating: 4.5,
  }
];
