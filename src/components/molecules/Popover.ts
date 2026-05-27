export type PriceBreakdown = {
  base: string;
  tax: string;
  fees: string;
};

export type PricingPopoverOptions = {
  title?: string;
  price?: string;
  subtitleHtml?: string;
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
  subtitleHtml = '<strong class="circuit-card__meta-location">Marruecos, África</strong> 9 días',
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

  // Parse location and duration from subtitleHtml
  const subtitleEl = document.createElement("div");
  subtitleEl.className = "pricing-popover__subtitle";
  const match = subtitleHtml.match(/<strong[^>]*>([^<]+)<\/strong>\s*(?:·|)\s*([^<]+)/);
  if (match) {
    const location = match[1].trim();
    const duration = match[2].trim();
    subtitleEl.innerHTML = `<span class="pricing-popover__location">${location}</span><span class="pricing-popover__duration">${duration}</span>`;
  } else {
    subtitleEl.innerHTML = subtitleHtml;
    }

  // DESKTOP VIEW
  const desktopView = document.createElement("div");
  desktopView.className = "pricing-popover__desktop-view";

  const desktopDetails = document.createElement("ul");
  desktopDetails.className = "pricing-popover__details";
  [
    ["Precio antes de impuestos", `${breakdown.base} €`],
    ["Impuesto", `${breakdown.tax} €`],
    ["Lorem Ipsum", `${breakdown.fees} €`],
  ].forEach(([label, value]) => {
    const row = document.createElement("li");
    row.innerHTML = `<span>${label}</span> <span>${value}</span>`;
    desktopDetails.append(row);
  });
  const desktopTotal = document.createElement("li");
  desktopTotal.className = "pricing-popover__total";
  desktopTotal.innerHTML = `<span>Precio final</span> <strong>${price}</strong>`;
  desktopDetails.append(desktopTotal);
  desktopView.append(desktopDetails);

  popover.append(header, subtitleEl, desktopView);
  return popover;
};
