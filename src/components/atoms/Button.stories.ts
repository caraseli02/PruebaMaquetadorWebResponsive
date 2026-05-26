import { createButton, type ButtonSize, type ButtonVariant } from "./Button";
import { createStoryShell } from "./storyUtils";

export default {
  title: "Atoms/Button",
  parameters: {
    layout: "centered",
  },
};

type ButtonArgs = {
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
};

const figmaRows: Array<{ variant: ButtonVariant; size: ButtonSize; label: string; disabled?: boolean }> = [
  { variant: "plum", size: "sm", label: "Button" },
  { variant: "plum", size: "sm", label: "Button" },
  { variant: "plum", size: "sm", label: "Button", disabled: true },
  { variant: "plum", size: "md", label: "Reserva" },
  { variant: "plum", size: "md", label: "Button" },
  { variant: "plum", size: "md", label: "Button", disabled: true },
  { variant: "plum", size: "lg", label: "Button" },
  { variant: "plum", size: "lg", label: "Button" },
  { variant: "plum", size: "lg", label: "Button", disabled: true },
  { variant: "orange", size: "sm", label: "Button" },
  { variant: "orange", size: "sm", label: "Button" },
  { variant: "orange", size: "sm", label: "Button", disabled: true },
  { variant: "orange", size: "md", label: "Button" },
  { variant: "orange", size: "md", label: "Button" },
  { variant: "orange", size: "md", label: "Button", disabled: true },
  { variant: "orange", size: "lg", label: "Button" },
  { variant: "orange", size: "lg", label: "Button" },
  { variant: "orange", size: "lg", label: "Button", disabled: true },
];

export const Matrix = () => {
  const container = createStoryShell("Buttons");
  const matrix = document.createElement("div");
  matrix.className = "button-matrix";

  figmaRows.forEach((row) => {
    const cell = document.createElement("div");
    cell.className = "button-matrix__cell";
    cell.append(createButton(row));
    matrix.append(cell);
  });

  container.append(matrix);
  return container;
};

export const Playground = {
  args: {
    label: "Reserva",
    variant: "orange",
    size: "md",
    disabled: false,
  } satisfies ButtonArgs,
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["plum", "orange", "outline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  render: (args: ButtonArgs) => {
    const container = createStoryShell("Button playground");
    container.append(createButton(args));
    return container;
  },
};
