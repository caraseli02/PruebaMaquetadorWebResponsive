import { createCircuitCard, circuitCardImages, type CircuitCardOptions } from "./CircuitCard";

export type CardRowOptions = {
  cards?: CircuitCardOptions[];
};

export const figmaCardRowItems: CircuitCardOptions[] = [
  { imageSrc: circuitCardImages.bangkok, imageAlt: "Jardin y templo en Bangkok" },
  { imageSrc: circuitCardImages.desert, imageAlt: "Excursión por dunas en Marruecos" },
  { imageSrc: circuitCardImages.mountain, imageAlt: "Vista de ciudad en montaña" },
  { imageSrc: circuitCardImages.bangkok, imageAlt: "Jardin y templo en Bangkok" },
  { imageSrc: circuitCardImages.desert, imageAlt: "Excursión por dunas en Marruecos" },
  { imageSrc: circuitCardImages.mountain, imageAlt: "Vista de ciudad en montaña" },
];

export const createCardRow = ({ cards = figmaCardRowItems }: CardRowOptions = {}): HTMLElement => {
  const row = document.createElement("section");
  row.className = "card-row";
  row.setAttribute("aria-label", "Circuitos destacados");

  cards.forEach((card) => {
    row.append(createCircuitCard(card));
  });

  return row;
};
