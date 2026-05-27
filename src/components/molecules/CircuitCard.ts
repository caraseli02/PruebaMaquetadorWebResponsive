import bangkokImage from "../../assets/Rectangle 50.png";
import desertImage from "../../assets/Rectangle 50 (1).png";
import mountainImage from "../../assets/Rectangle 50 (2).png";
import { createTag } from "../atoms/Tag";
import { createBottomBarCircuitCard, type BottomBarCircuitCardOptions } from "./BottomBarCircuitCard";

export type CircuitCardOptions = {
  imageSrc?: string;
  imageAlt?: string;
  tag?: string;
  location?: string;
  region?: string;
  durationDays?: number;
  title?: string;
  bottomBar?: BottomBarCircuitCardOptions;
  loading?: "lazy" | "eager";
  fetchpriority?: "high" | "low" | "auto";
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
  location = "Marruecos",
  region = "África",
  durationDays = 9,
  title = "Descubre Bangkok con Iberojet",
  bottomBar = {},
  loading = "lazy",
  fetchpriority,
}: CircuitCardOptions = {}): HTMLElement => {
  const article = document.createElement("article");
  article.className = "circuit-card";

  const media = document.createElement("div");
  media.className = "circuit-card__media";

  const image = document.createElement("img");
  image.className = "circuit-card__image";
  image.src = imageSrc;
  image.alt = imageAlt;
  image.loading = loading;
  if (fetchpriority) {
    image.setAttribute("fetchpriority", fetchpriority);
  }

  const tagElement = createTag({ label: tag, variant: "filled" });
  tagElement.classList.add("circuit-card__tag");

  media.append(image, tagElement);

  const body = document.createElement("div");
  body.className = "circuit-card__body";

  const metaElement = document.createElement("p");
  metaElement.className = "circuit-card__meta";

  const locationElement = document.createElement("strong");
  locationElement.className = "circuit-card__meta-location";
  locationElement.textContent = `${location}, ${region}`;
  metaElement.append(locationElement, document.createTextNode(` · ${durationDays} días`));

  const heading = document.createElement("h3");
  heading.className = "circuit-card__title";
  heading.textContent = title;

  body.append(metaElement, heading);
  article.append(media, body, createBottomBarCircuitCard(bottomBar));
  return article;
};
