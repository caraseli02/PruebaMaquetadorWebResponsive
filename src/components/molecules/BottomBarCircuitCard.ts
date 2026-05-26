import { createButton } from "../atoms/Button";
import { createIcon } from "../atoms/Icon";

export type BottomBarCircuitCardLayout = "inline" | "stacked" | "wide";

export type BottomBarCircuitCardOptions = {
  price?: string;
  eyebrow?: string;
  detailsLabel?: string;
  buttonLabel?: string;
  layout?: BottomBarCircuitCardLayout;
};

export const createBottomBarCircuitCard = ({
  price = "248,00 €",
  eyebrow = "Desde",
  detailsLabel = "Ver desglose",
  buttonLabel = "Reservar",
  layout = "inline",
}: BottomBarCircuitCardOptions = {}): HTMLElement => {
  const footer = document.createElement("footer");
  footer.className = `bottom-bar-circuit-card bottom-bar-circuit-card--${layout}`;

  const priceBlock = document.createElement("div");
  priceBlock.className = "bottom-bar-circuit-card__price";

  if (eyebrow) {
    const eyebrowElement = document.createElement("span");
    eyebrowElement.className = "bottom-bar-circuit-card__eyebrow";
    eyebrowElement.textContent = eyebrow;
    priceBlock.append(eyebrowElement);
  }

  const amount = document.createElement("strong");
  amount.className = "bottom-bar-circuit-card__amount";
  amount.textContent = price;

  priceBlock.append(amount);

  const action = createButton({ label: buttonLabel, variant: "outline" });
  action.classList.add("bottom-bar-circuit-card__button");

  if (detailsLabel) {
    const details = document.createElement("a");
    details.className = "bottom-bar-circuit-card__details";
    details.href = "#";
    details.append(
      document.createTextNode(detailsLabel), 
      createIcon({ name: "chevronDownCompact", size: 16, color: "currentColor" })
    );
    footer.append(priceBlock, details, action);
  } else {
    footer.append(priceBlock, action);
  }

  return footer;
};
