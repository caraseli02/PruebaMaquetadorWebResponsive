import { uniqueId } from "../atoms/html";

export type FooterSocial = "facebook" | "x" | "instagram" | "youtube";
export type FooterContentSocialLayout = "inline" | "spread";

export type FooterContentOptions = {
  title?: string;
  phone?: string;
  schedule?: string;
  email?: string;
  socials?: FooterSocial[];
  socialLayout?: FooterContentSocialLayout;
};

const socialLabels: Record<FooterSocial, string> = {
  facebook: "Facebook",
  x: "X",
  instagram: "Instagram",
  youtube: "YouTube",
};

const createSocialIcon = (name: FooterSocial): HTMLElement => {
  const icon = document.createElement("span");
  icon.className = `footer-content__social-icon footer-content__social-icon--${name}`;
  icon.setAttribute("aria-hidden", "true");

  if (name === "facebook") {
    icon.textContent = "f";
  }

  if (name === "x") {
    icon.textContent = "X";
  }

  if (name === "instagram") {
    const camera = document.createElement("span");
    camera.className = "footer-content__camera";
    icon.append(camera);
  }

  if (name === "youtube") {
    const play = document.createElement("span");
    play.className = "footer-content__play";
    icon.append(play);
  }

  return icon;
};

export const createFooterContent = ({
  title = "Contacta con nosotros",
  phone = "918 46 00 48",
  schedule = "Lunes a Viernes 09:30h a 19:30h",
  email = "reservas@muchoviaje.com",
  socials = ["facebook", "x", "instagram", "youtube"],
  socialLayout = "inline",
}: FooterContentOptions = {}): HTMLElement => {
  const titleId = uniqueId("footer-contact-title");
  const section = document.createElement("section");
  section.className = `footer-content footer-content--${socialLayout}`;
  section.setAttribute("aria-labelledby", titleId);

  const heading = document.createElement("h3");
  heading.id = titleId;
  heading.className = "footer-content__title";
  heading.textContent = title;

  const list = document.createElement("dl");
  list.className = "footer-content__details";

  const rows = [
    ["Llámanos al:", phone, `tel:${phone.replace(/\s/g, "")}`],
    ["Nuevo horario:", schedule],
    ["Email de atención al viajero:", email, `mailto:${email}`],
  ] as const;

  rows.forEach(([label, value, href]) => {
    const term = document.createElement("dt");
    term.textContent = label;

    const description = document.createElement("dd");
    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = value;
      description.append(link);
    } else {
      description.textContent = value;
    }

    list.append(term, description);
  });

  const socialList = document.createElement("ul");
  socialList.className = "footer-content__socials";
  socialList.setAttribute("aria-label", "Redes sociales");

  socials.forEach((social) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "footer-content__social";
    link.href = "#";
    link.setAttribute("aria-label", socialLabels[social]);
    link.append(createSocialIcon(social));
    item.append(link);
    socialList.append(item);
  });

  section.append(heading, list, socialList);
  return section;
};
