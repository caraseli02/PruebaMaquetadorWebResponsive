import { createTextInput, type TextInputVariant } from "./TextInput";
import { createStoryShell } from "./storyUtils";

export default {
  title: "Atoms/TextInput",
  parameters: {
    layout: "centered",
  },
};

type TextInputArgs = {
  label: string;
  value: string;
  placeholder: string;
  variant: TextInputVariant;
  hasChevron: boolean;
  disabled: boolean;
  invalid: boolean;
};

const variants: TextInputVariant[] = [
  "accent",
  "accent",
];

export const Matrix = () => {
  const container = createStoryShell("Text inputs");
  const matrix = document.createElement("div");
  matrix.className = "text-input-matrix";

  variants.forEach((variant, columnIndex) => {
    const column = document.createElement("div");
    column.className = "text-input-matrix__column";

    column.append(
      createTextInput({ variant, hasChevron: columnIndex === 0, value: "Aventura" }),
      createTextInput({ variant, hasChevron: columnIndex === 0, value: "Destinos" }),
      createTextInput({ variant, hasChevron: columnIndex === 0, value: "Marruecos" }),
      createTextInput({ variant, hasChevron: columnIndex === 0, value: "Australia" }),
      createTextInput({ variant, value: "9 días" }),
      createTextInput({ variant, value: "2 personas" }),
      createTextInput({ variant, value: "Madrid" }),
      createTextInput({ variant, value: "Reservado" }),
    );
    matrix.append(column);
  });

  container.append(matrix);
  return container;
};

export const Playground = {
  args: {
    label: "Entrada",
    value: "Australia",
    placeholder: "Escribe aquí...",
    variant: "neutral",
    hasChevron: true,
    disabled: false,
    invalid: false,
  } satisfies TextInputArgs,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    placeholder: { control: "text" },
    variant: { control: "select", options: ["neutral", "dark", "accent"] },
    hasChevron: { control: "boolean" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  render: (args: TextInputArgs) => {
    const container = createStoryShell("Text input playground");
    container.append(createTextInput(args));
    return container;
  },
};
