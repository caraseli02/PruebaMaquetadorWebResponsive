export type PriceBreakdown = {
  base: string;
  tax: string;
  fees: string;
};

export type PricingPopoverOptions = {
  title?: string;
  price?: string;
  breakdown?: PriceBreakdown;
  onClose?: () => void;
};

export const calculatePriceBreakdown = (price: string): PriceBreakdown => {
  const rawPrice = parseFloat(price.replace(/[^\d,]/g, "").replace(",", "."));
  const safePrice = Number.isFinite(rawPrice) ? rawPrice : 0;

  return {
    base: (safePrice * 0.79).toFixed(2),
    tax: (safePrice * 0.15).toFixed(2),
    fees: (safePrice * 0.06).toFixed(2),
  };
};

export const createPricingPopover = ({
  title = "Desglose de precio",
  price = "248,00 €",
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

  const details = document.createElement("ul");
  details.className = "pricing-popover__details";

  [
    ["Precio base:", `${breakdown.base} €`],
    ["Impuestos (IVA 21%):", `${breakdown.tax} €`],
    ["Gastos de gestión:", `${breakdown.fees} €`],
  ].forEach(([label, value]) => {
    const row = document.createElement("li");
    row.innerHTML = `<span>${label}</span> <strong>${value}</strong>`;
    details.append(row);
  });

  const total = document.createElement("li");
  total.className = "pricing-popover__total";
  total.innerHTML = `<span>Total estimado:</span> <strong>${price}</strong>`;
  details.append(total);

  popover.append(header, details);
  return popover;
};
