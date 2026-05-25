import "./Header.css";
import { Button } from "../../atoms/Button/Button";

export interface HeaderProps {
  navLinks?: Array<{ label: string; href: string }>;
  logoSrc?: string;
  onLinkClick?: (href: string) => void;
}

/**
 * Sticky, responsive Header organism featuring mobile slide dropdown menus.
 */
export function Header({
  navLinks = [
    { label: "Inicio", href: "#" },
    { label: "Cursos", href: "#cursos" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ],
  logoSrc = "/src/assets/logo-dark.svg",
  onLinkClick,
}: HeaderProps = {}): HTMLElement {
  const header = document.createElement("header");
  header.className = "header";
  
  const container = document.createElement("div");
  container.className = "header__container container";
  
  // Brand logo
  const logoLink = document.createElement("a");
  logoLink.href = "#";
  logoLink.className = "header__logo";
  logoLink.setAttribute("aria-label", "Página de inicio de DUX");
  
  const logoImg = document.createElement("img");
  logoImg.src = logoSrc;
  logoImg.alt = "DUX Logo";
  logoImg.style.height = "28px";
  logoImg.style.width = "auto";
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
      const iconSpan = toggleBtn.querySelector(".icon");
      if (iconSpan) {
        iconSpan.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `.trim();
      }
    });
    
    item.appendChild(a);
    mobileNavList.appendChild(item);
  });
  mobileMenu.appendChild(mobileNavList);
  
  // Mobile hamburger menu toggle button
  const toggleBtn = Button({
    variant: "ghost",
    iconOnly: true,
    iconName: "menu",
    ariaLabel: "Abrir menú de navegación móvil",
    className: "header__toggle",
  });
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-controls", "mobile-nav-menu");
  
  // Burger open-close logic
  toggleBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("header__mobile-menu--open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggleBtn.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación móvil" : "Abrir menú de navegación móvil");
    
    const iconSpan = toggleBtn.querySelector(".icon");
    if (iconSpan) {
      if (isOpen) {
        // Change burger to close icon (x)
        iconSpan.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `.trim();
      } else {
        // Restore burger menu icon
        iconSpan.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `.trim();
      }
    }
  });
  container.appendChild(toggleBtn);
  
  header.appendChild(container);
  header.appendChild(mobileMenu);
  
  return header;
}
