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
      createTextInput({ variant, hasChevron: columnIndex === 0, value: "Lorem Ipsum" }),
      createTextInput({ variant, hasChevron: columnIndex === 0, value: "Lorem Ipsum" }),
      createTextInput({ variant, hasChevron: columnIndex === 0, value: "Lorem Ipsum" }),
      createTextInput({ variant, hasChevron: columnIndex === 0, value: "Lorem Ipsum" }),
      createTextInput({ variant, value: "Lorem Ipsum" }),
      createTextInput({ variant, value: "Lorem Ipsum" }),
      createTextInput({ variant, value: "Lorem Ipsum" }),
      createTextInput({ variant, value: "Lorem Ipsum" }),
    );
    matrix.append(column);
  });

  container.append(matrix);
  return container;
};

export const Playground = {
  args: {
    label: "Entrada",
    value: "Lorem Ipsum",
    placeholder: "Lorem Ipsum",
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
