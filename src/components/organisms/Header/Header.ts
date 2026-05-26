import "./Header.css";
import { createButton } from "../../atoms/Button";
import { createIcon } from "../../atoms/Icon";
import logoLight from "../../../assets/logo-light.svg";
import logoDark from "../../../assets/logo-dark.svg";

export interface HeaderProps {
  navLinks?: Array<{ label: string; href: string }>;
  onLinkClick?: (href: string) => void;
  theme?: "light" | "dark";
}

/**
 * Sticky, responsive Header organism featuring mobile slide dropdown menus.
 */
export function createHeader({
  navLinks = [
    { label: "Inicio", href: "#" },
    { label: "Cursos", href: "#cursos" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ],
  onLinkClick,
  theme = "light",
}: HeaderProps = {}): HTMLElement {
  const header = document.createElement("header");
  header.className = `header header--${theme}`;
  
  const container = document.createElement("div");
  container.className = "header__container container";
  
  // Brand logo
  const logoLink = document.createElement("a");
  logoLink.href = "#";
  logoLink.className = "header__logo";
  logoLink.setAttribute("aria-label", "Página de inicio de waveless");
  
  const logoImg = document.createElement("img");
  logoImg.src = theme === "light" ? logoLight : logoDark;
  logoImg.alt = "waveless Logo";
  logoImg.className = "header__logo-img";
  logoLink.appendChild(logoImg);
  container.appendChild(logoLink);
  
  // Desktop Navigation
  const nav = document.createElement("nav");
  nav.className = "header__nav";
  
  const navList = document.createElement("ul");
  navList.className = "header__nav-list";
  
  navLinks.forEach((link) => {
    const item = document.createElement("li");
    const a = document.createElement("a");
    a.className = "header__nav-link";
    a.href = link.href;
    a.textContent = link.label;
    if (onLinkClick) {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        onLinkClick(link.href);
      });
    }
    item.appendChild(a);
    navList.appendChild(item);
  });
  
  // Reserva button
  const reservaLi = document.createElement("li");
  const reservaBtn = createButton({
    label: "Reserva",
    variant: "plum",
    size: "sm",
  });
  reservaLi.appendChild(reservaBtn);
  navList.appendChild(reservaLi);
  
  nav.appendChild(navList);
  container.appendChild(nav);
  
  // Mobile dropdown navigation menu
  const mobileMenu = document.createElement("nav");
  mobileMenu.className = "header__mobile-menu";
  mobileMenu.id = "mobile-nav-menu";
  
  const mobileNavList = document.createElement("ul");
  mobileNavList.className = "header__mobile-nav-list";
  
  navLinks.forEach((link) => {
    const item = document.createElement("li");
    const a = document.createElement("a");
    a.className = "header__mobile-nav-link";
    a.href = link.href;
    a.textContent = link.label;
    
    // Auto-close menu when link is clicked
    a.addEventListener("click", (e) => {
      if (onLinkClick) {
        e.preventDefault();
        onLinkClick(link.href);
      }
      mobileMenu.classList.remove("header__mobile-menu--open");
      toggleBtn.setAttribute("aria-expanded", "false");
      // Restore menu icon
      toggleBtn.innerHTML = "";
      toggleBtn.appendChild(createIcon({ name: "menu", size: 24 }));
    });
    
    item.appendChild(a);
    mobileNavList.appendChild(item);
  });
  
  // Mobile CTA Button inside mobile menu
  const mobileCtaItem = document.createElement("li");
  mobileCtaItem.style.marginTop = "var(--space-md)";
  mobileCtaItem.style.listStyle = "none";
  const mobileCtaBtn = createButton({
    label: "Reserva",
    variant: "plum",
    size: "md",
  });
  mobileCtaBtn.style.width = "100%";
  mobileCtaItem.appendChild(mobileCtaBtn);
  mobileNavList.appendChild(mobileCtaItem);
  
  mobileMenu.appendChild(mobileNavList);
  
  // Mobile hamburger menu toggle button using Icon atom
  const toggleBtn = createButton({
    variant: "outline",
    size: "sm",
  });
  toggleBtn.classList.add("header__toggle");
  toggleBtn.innerHTML = ""; // clear label
  toggleBtn.appendChild(createIcon({ name: "menu", size: 24 }));
  toggleBtn.setAttribute("aria-label", "Abrir menú de navegación móvil");
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-controls", "mobile-nav-menu");
  
  // Burger open-close logic
  toggleBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("header__mobile-menu--open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggleBtn.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación móvil" : "Abrir menú de navegación móvil");
    
    toggleBtn.innerHTML = "";
    if (isOpen) {
      toggleBtn.appendChild(createIcon({ name: "close", size: 24 }));
    } else {
      toggleBtn.appendChild(createIcon({ name: "menu", size: 24 }));
    }
  });
  container.appendChild(toggleBtn);
  
  header.appendChild(container);
  header.appendChild(mobileMenu);
  
  return header;
}
