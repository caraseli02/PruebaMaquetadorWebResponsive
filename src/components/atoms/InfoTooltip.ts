import { uniqueId } from "./html";

export type InfoTooltipOptions = {
  text?: string;
  visible?: boolean;
  id?: string;
};

export const createInfoTooltip = ({
  text = "Lorem ipsum",
  visible = false,
  id = uniqueId("info-tooltip"),
}: InfoTooltipOptions = {}): HTMLElement => {
  const container = document.createElement("span");
  container.className = `info-tooltip${visible ? " info-tooltip--visible" : ""}`;

  const trigger = document.createElement("button");
  trigger.className = "info-tooltip__trigger";
  trigger.type = "button";
  trigger.setAttribute("aria-label", "Mostrar informacion");
  trigger.setAttribute("aria-describedby", id);

  const mark = document.createElement("span");
  mark.className = "info-tooltip__mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = "i";
  trigger.append(mark);

  const bubble = document.createElement("span");
  bubble.className = "info-tooltip__bubble";
  bubble.id = id;
  bubble.role = "tooltip";
  bubble.textContent = text;

  container.append(trigger, bubble);
  return container;
};
