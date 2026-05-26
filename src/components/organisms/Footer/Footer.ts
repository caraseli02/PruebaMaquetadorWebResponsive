import "./Footer.css";
import { createFooterContent } from "../../molecules/FooterContent";
import logoLight from "../../../assets/logo-dark.svg"; // Footer has a dark background, so we use logoDark (which is light-colored text/logo)

export interface FooterProps {
  brandText?: string;
  copyrightText?: string;
}

/**
 * High-fidelity, semantic, accessible Footer organism integrating sub-navigation lists,
 * social links, and figma specific contact modules.
 */
export function createFooter({
  brandText = "Plataforma de reservas de aventuras y viajes en grupo más grande de España y Europa.",
  copyrightText = "© 2026 waveless. Todos los derechos reservados. Prueba maquetador web responsive.",
}: FooterProps = {}): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "footer";
  
  const container = document.createElement("div");
  container.className = "footer__container container";
  
  // Column 1: Brand details & description
  const brandCol = document.createElement("div");
  brandCol.className = "footer__brand-col";
  
  const logoLink = document.createElement("a");
  logoLink.href = "#";
  logoLink.className = "footer__logo-link";
  logoLink.setAttribute("aria-label", "Página de inicio de waveless");
  
  const logoImg = document.createElement("img");
  logoImg.src = logoLight;
  logoImg.alt = "waveless logo light";
  logoImg.className = "footer__logo-img";
  logoLink.appendChild(logoImg);
  brandCol.appendChild(logoLink);
  
  const desc = document.createElement("p");
  desc.className = "footer__desc";
  desc.textContent = brandText;
  brandCol.appendChild(desc);
  
  container.appendChild(brandCol);
  
  // Column 2: Navigation Columns
  const navWrapper = document.createElement("nav");
  navWrapper.className = "footer__nav-wrapper";
  navWrapper.setAttribute("aria-label", "Pie de página navegación secundaria");
  
  // Cursos Navigation
  const colCursos = document.createElement("div");
  colCursos.className = "footer__nav-col";
  const titleCursos = document.createElement("h4");
  titleCursos.className = "footer__nav-title";
  titleCursos.textContent = "Cursos";
  colCursos.appendChild(titleCursos);
  
  const listCursos = document.createElement("ul");
  listCursos.className = "footer__nav-list";
  ["CSS Grid", "Flexbox", "Accesibilidad", "TypeScript"].forEach((txt) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "footer__nav-link";
    a.href = "#";
    a.textContent = txt;
    li.appendChild(a);
    listCursos.appendChild(li);
  });
  colCursos.appendChild(listCursos);
  navWrapper.appendChild(colCursos);
  
  // Recursos Navigation
  const colRecursos = document.createElement("div");
  colRecursos.className = "footer__nav-col";
  const titleRecursos = document.createElement("h4");
  titleRecursos.className = "footer__nav-title";
  titleRecursos.textContent = "Recursos";
  colRecursos.appendChild(titleRecursos);
  
  const listRecursos = document.createElement("ul");
  listRecursos.className = "footer__nav-list";
  ["Blog", "Glosario", "Guía a11y", "Vite Config"].forEach((txt) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "footer__nav-link";
    a.href = "#";
    a.textContent = txt;
    li.appendChild(a);
    listRecursos.appendChild(li);
  });
  colRecursos.appendChild(listRecursos);
  navWrapper.appendChild(colRecursos);
  
  // Compañía Navigation
  const colComp = document.createElement("div");
  colComp.className = "footer__nav-col";
  const titleComp = document.createElement("h4");
  titleComp.className = "footer__nav-title";
  titleComp.textContent = "Compañía";
  colComp.appendChild(titleComp);
  
  const listComp = document.createElement("ul");
  listComp.className = "footer__nav-list";
  ["Nosotros", "Trabaja con nosotros", "Contacto", "FAQ"].forEach((txt) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "footer__nav-link";
    a.href = "#";
    a.textContent = txt;
    li.appendChild(a);
    listComp.appendChild(li);
  });
  colComp.appendChild(listComp);
  navWrapper.appendChild(colComp);
  
  container.appendChild(navWrapper);
  
  // Column 3: Contact & Socials Content Molecule
  const contactCol = document.createElement("div");
  contactCol.className = "footer__contact-col";
  const footerContact = createFooterContent({
    phone: "918 46 00 48",
    schedule: "Lunes a Viernes 09:30h a 19:30h",
    email: "reservas@waveless.com",
    socialLayout: "inline",
  });
  
  // Restructure/Style inline FooterContent for dark theme placement
  const footerTitle = footerContact.querySelector(".footer-content__title");
  if (footerTitle) footerTitle.classList.add("footer__nav-title");
  
  const footerDetails = footerContact.querySelector(".footer-content__details");
  if (footerDetails) {
    footerDetails.querySelectorAll("dt").forEach((dt) => {
      dt.style.color = "var(--color-gray-300)";
      dt.style.fontSize = "var(--font-size-xs)";
    });
    footerDetails.querySelectorAll("dd").forEach((dd) => {
      dd.style.color = "white";
      dd.style.fontSize = "var(--font-size-xs)";
    });
    footerDetails.querySelectorAll("a").forEach((a) => {
      a.style.color = "var(--color-orange-500)";
    });
  }
  
  contactCol.appendChild(footerContact);
  container.appendChild(contactCol);
  
  footer.appendChild(container);
  
  // Bottom Copyright base row
  const bottom = document.createElement("div");
  bottom.className = "footer__bottom container";
  
  const copy = document.createElement("span");
  copy.className = "footer__copyright";
  copy.textContent = copyrightText;
  bottom.appendChild(copy);
  
  const bottomLinks = document.createElement("div");
  bottomLinks.className = "footer__bottom-links";
  ["Privacidad", "Términos", "Cookies"].forEach((txt) => {
    const a = document.createElement("a");
    a.className = "footer__bottom-link";
    a.href = "#";
    a.textContent = txt;
    bottomLinks.appendChild(a);
  });
  bottom.appendChild(bottomLinks);
  footer.appendChild(bottom);
  
  return footer;
}
