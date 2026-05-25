import "./Footer.css";
import { Icon } from "../../atoms/Icon/Icon";

export interface FooterProps {
  logoSrc?: string;
  brandText?: string;
  copyrightText?: string;
}

/**
 * Semantic, accessible Footer organism incorporating dark mode branding.
 */
export function Footer({
  logoSrc = "/src/assets/logo-light.svg",
  brandText = "Plataforma educativa líder en desarrollo web fluido, interactivo y accesible de alta fidelidad.",
  copyrightText = "© 2026 DUX Corp. Todos los derechos reservados. Prueba maquetador web responsive.",
}: FooterProps = {}): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "footer";
  
  const container = document.createElement("div");
  container.className = "footer__container container";
  
  // Brand Column
  const brandCol = document.createElement("div");
  brandCol.className = "footer__brand";
  
  const logoLink = document.createElement("a");
  logoLink.href = "#";
  logoLink.className = "footer__logo";
  
  const logoImg = document.createElement("img");
  logoImg.src = logoSrc;
  logoImg.alt = "DUX Logo";
  logoImg.style.height = "28px";
  logoImg.style.width = "auto";
  logoLink.appendChild(logoImg);
  brandCol.appendChild(logoLink);
  
  const desc = document.createElement("p");
  desc.className = "footer__desc";
  desc.textContent = brandText;
  brandCol.appendChild(desc);
  
  container.appendChild(brandCol);
  
  // Navigation Links Columns
  const nav = document.createElement("nav");
  nav.className = "footer__nav";
  nav.setAttribute("aria-label", "Pie de página navegación secundaria");
  
  // Column 1: Cursos
  const col1 = document.createElement("div");
  col1.className = "footer__nav-col";
  const t1 = document.createElement("h4");
  t1.className = "footer__nav-title";
  t1.textContent = "Cursos";
  col1.appendChild(t1);
  const l1 = document.createElement("ul");
  l1.className = "footer__nav-list";
  ["CSS Grid", "Flexbox", "Accesibilidad", "TypeScript"].forEach((txt) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "footer__nav-link";
    a.href = "#";
    a.textContent = txt;
    li.appendChild(a);
    l1.appendChild(li);
  });
  col1.appendChild(l1);
  nav.appendChild(col1);
  
  // Column 2: Recursos
  const col2 = document.createElement("div");
  col2.className = "footer__nav-col";
  const t2 = document.createElement("h4");
  t2.className = "footer__nav-title";
  t2.textContent = "Recursos";
  col2.appendChild(t2);
  const l2 = document.createElement("ul");
  l2.className = "footer__nav-list";
  ["Blog", "Glosario", "Guía a11y", "Vite Config"].forEach((txt) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "footer__nav-link";
    a.href = "#";
    a.textContent = txt;
    li.appendChild(a);
    l2.appendChild(li);
  });
  col2.appendChild(l2);
  nav.appendChild(col2);
  
  // Column 3: Compañía
  const col3 = document.createElement("div");
  col3.className = "footer__nav-col";
  const t3 = document.createElement("h4");
  t3.className = "footer__nav-title";
  t3.textContent = "Compañía";
  col3.appendChild(t3);
  const l3 = document.createElement("ul");
  l3.className = "footer__nav-list";
  ["Nosotros", "Trabaja con nosotros", "Contacto", "FAQ"].forEach((txt) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "footer__nav-link";
    a.href = "#";
    a.textContent = txt;
    li.appendChild(a);
    l3.appendChild(li);
  });
  col3.appendChild(l3);
  nav.appendChild(col3);
  
  container.appendChild(nav);
  
  // Social Networks Column
  const socialCol = document.createElement("div");
  socialCol.className = "footer__socials";
  const tSocial = document.createElement("h4");
  tSocial.className = "footer__nav-title";
  tSocial.textContent = "Síguenos";
  socialCol.appendChild(tSocial);
  
  const socialList = document.createElement("div");
  socialList.className = "footer__social-list";
  ["instagram", "facebook", "linkedin", "twitter"].forEach((name) => {
    const a = document.createElement("a");
    a.className = "footer__social-link";
    a.href = "#";
    a.setAttribute("aria-label", `Seguir a DUX en ${name}`);
    const sIcon = Icon({ name: name as any, size: 16 });
    a.appendChild(sIcon);
    socialList.appendChild(a);
  });
  socialCol.appendChild(socialList);
  container.appendChild(socialCol);
  
  footer.appendChild(container);
  
  // Bottom Copyright Row
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
