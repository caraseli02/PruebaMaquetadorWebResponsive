import bangkokImage from "../../assets/Rectangle 50.png";
import desertImage from "../../assets/Rectangle 50 (1).png";
import mountainImage from "../../assets/Rectangle 50 (2).png";
import { createTag } from "../atoms/Tag";
import { createBottomBarCircuitCard, type BottomBarCircuitCardOptions } from "./BottomBarCircuitCard";

export type CircuitCardOptions = {
  imageSrc?: string;
  imageAlt?: string;
  tag?: string;
  meta?: string;
  title?: string;
  bottomBar?: BottomBarCircuitCardOptions;
};

export const circuitCardImages = {
  bangkok: bangkokImage,
  desert: desertImage,
  mountain: mountainImage,
} as const;

export const createCircuitCard = ({
  imageSrc = bangkokImage,
  imageAlt = "Jardin y templo en Bangkok",
  tag = "Quads",
  meta = '<strong class="circuit-card__meta-location">Marruecos, África</strong> 9 días',
  title = "Descubre Bangkok con Iberojet",
  bottomBar = {},
}: CircuitCardOptions = {}): HTMLElement => {
  const article = document.createElement("article");
  article.className = "circuit-card";

  const media = document.createElement("div");
  media.className = "circuit-card__media";

  const image = document.createElement("img");
  image.className = "circuit-card__image";
  image.src = imageSrc;
  image.alt = imageAlt;
  image.loading = "lazy";

  const tagElement = createTag({ label: tag, variant: "filled" });
  tagElement.classList.add("circuit-card__tag");

  media.append(image, tagElement);

  const body = document.createElement("div");
  body.className = "circuit-card__body";

  const metaElement = document.createElement("p");
  metaElement.className = "circuit-card__meta";
  metaElement.innerHTML = meta;

  const heading = document.createElement("h3");
  heading.className = "circuit-card__title";
  heading.textContent = title;

  body.append(metaElement, heading);
  article.append(media, body, createBottomBarCircuitCard(bottomBar));
  return article;
};
