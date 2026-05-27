import "./Popover.css";

export type PriceBreakdown = {
  base: string;
  tax: string;
  fees: string;
};

export type PricingPopoverOptions = {
  title?: string;
  price?: string;
  location?: string;
  region?: string;
  durationDays?: number;
  breakdown?: PriceBreakdown;
  onClose?: () => void;
};

export const calculatePriceBreakdown = (price: string): PriceBreakdown => {
  const rawPrice = parseFloat(price.replace(/[^\d,]/g, "").replace(",", "."));
  const safePrice = Number.isFinite(rawPrice) ? rawPrice : 0;

  return {
    base: (safePrice * 0.79).toFixed(2).replace(".", ","),
    tax: (safePrice * 0.15).toFixed(2).replace(".", ","),
    fees: (safePrice * 0.06).toFixed(2).replace(".", ","),
  };
};

export const createPricingPopover = ({
  title = "Desglose de precios",
  price = "248,00 €",
  location = "Marruecos",
  region = "África",
  durationDays = 9,
  breakdown = calculatePriceBreakdown(price),
  onClose,
}: PricingPopoverOptions = {}): HTMLElement => {
  const popover = document.createElement("div");
  popover.className = "pricing-popover";
  popover.setAttribute("role", "dialog");
  popover.setAttribute("aria-label", title);

  const header = document.createElement("div");
  header.className = "pricing-popover__header";

  const heading = document.createElement("h4");
  heading.className = "pricing-popover__title";
  heading.textContent = title;

  const close = document.createElement("button");
  close.className = "pricing-popover__close";
  close.type = "button";
  close.setAttribute("aria-label", "Cerrar desglose");
  close.textContent = "×";
  close.addEventListener("click", () => onClose?.());

  header.append(heading, close);

  const subtitleEl = document.createElement("div");
  subtitleEl.className = "pricing-popover__subtitle";

  const locationEl = document.createElement("span");
  locationEl.className = "pricing-popover__location";
  locationEl.textContent = `${location}, ${region}`;

  const durationEl = document.createElement("span");
  durationEl.className = "pricing-popover__duration";
  durationEl.textContent = `${durationDays} días`;

  subtitleEl.append(locationEl, durationEl);

  // DESKTOP VIEW
  const desktopView = document.createElement("div");
  desktopView.className = "pricing-popover__desktop-view";

  const desktopDetails = document.createElement("ul");
  desktopDetails.className = "pricing-popover__details";
  [
    ["Base", `${breakdown.base} €`],
    ["Impuestos", `${breakdown.tax} €`],
    ["Gastos de gestión", `${breakdown.fees} €`],
  ].forEach(([label, value]) => {
    const row = document.createElement("li");
    const labelEl = document.createElement("span");
    labelEl.textContent = label;
    const valueEl = document.createElement("span");
    valueEl.textContent = value;
    row.append(labelEl, valueEl);
    desktopDetails.append(row);
  });
  desktopView.append(desktopDetails);

  // FOOTER (Total Price)
  const footer = document.createElement("div");
  footer.className = "pricing-popover__footer";
  
  const totalLabel = document.createElement("span");
  totalLabel.textContent = "Precio final";
  const totalPrice = document.createElement("strong");
  totalPrice.textContent = price;
  footer.append(totalLabel, totalPrice);

  popover.append(header, subtitleEl, desktopView, footer);
  return popover;
};
