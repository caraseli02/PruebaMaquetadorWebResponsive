import { createStoryShell } from "../atoms/storyUtils";
import { createCircuitCard, circuitCardImages } from "./CircuitCard";

export default {
  title: "Molecules/CircuitCard",
  parameters: {
    layout: "centered",
  },
};

export const FigmaCards = () => {
  const container = createStoryShell("Card content / circuit card");
  const board = document.createElement("div");
  board.className = "molecule-board circuit-card-story";

  board.append(
    createCircuitCard({ imageSrc: circuitCardImages.bangkok, imageAlt: "Jardin y templo en Bangkok" }),
    createCircuitCard({ imageSrc: circuitCardImages.desert, imageAlt: "Excursión por dunas en Marruecos" }),
    createCircuitCard({ imageSrc: circuitCardImages.mountain, imageAlt: "Vista de ciudad en montaña" }),
  );

  container.append(board);
  return container;
};

export const ContainerWidths = () => {
  const container = createStoryShell("Circuit card container widths");
  const board = document.createElement("div");
  board.className = "circuit-card-widths";

  ["264px", "320px", "400px"].forEach((width) => {
    const frame = document.createElement("div");
    frame.className = "circuit-card-widths__frame";
    frame.style.width = width;
    frame.append(createCircuitCard());
    board.append(frame);
  });

  container.append(board);
  return container;
};
