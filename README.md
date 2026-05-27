# Prueba Acceso DUX

Este proyecto es una maqueta web responsive de alta fidelidad basada en un diseño de Figma para un catálogo de viajes de aventura y cultura. Está desarrollado utilizando Vanilla HTML/CSS y TypeScript modular bajo un enfoque moderno, accesible y semántico.

---

## Objetivo

Construir una página principal (Home) completamente responsive, accesible y estructurada, optimizada para dispositivos móviles, tablets y ordenadores de escritorio.

---

## Stack Tecnológico

- **Vite:** Empaquetador ultra-rápido para un desarrollo ágil.
- **TypeScript:** Tipado estricto para estructurar componentes y lógica de filtrado de forma segura y robusta.
- **Storybook:** Taller de componentes aislado para diseñar, documentar y probar de forma independiente Atoms, Molecules y Organisms.
- **HTML5 Semántico:** Estructura pura con etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<aside>`, `<dialog>`).
- **CSS Modular:** Estructura organizada con variables CSS nativas (Custom Properties) para tokens de diseño y nomenclatura inspirada en BEM.

---

## Decisiones Técnicas y Arquitectura

### 1. Estrategia CSS (Design Tokens & Especificidad)
- **tokens.css:** Define la escala de colores de marca, espaciado modular de base `4px/8px`, border-radius, tipografía y sombras extraídos de Figma.
- **base.css:** Contiene el reset global, tipografía base y utilidades universales como el bloqueo de scroll (`body.no-scroll`).
- **layout.css:** Define la cuadrícula global de la página y las columnas de composición.
- **components.css:** Estilos específicos y encapsulados para cada componente modular.
- **Especificidad Limpia:** Se ha evitado activamente el uso de `!important` refactorizando selectores con clases compuestas (como `.header__toggle.dux-button` o `.filter-dialog__close-btn.dux-button`) para anular estilos atómicos de manera natural.

### 2. Estrategia Responsive (Mobile-First)
- El diseño está implementado bajo un enfoque **Mobile-First** estricto utilizando consultas `@media (min-width: ...)` para escalar progresivamente desde pantallas móviles pequeñas hasta tablets y ordenadores de escritorio de gran resolución.
- Los breakpoints clave definidos son:
  - **Móvil (Base):** Pantalla por debajo de `480px`
  - **Tablet (Adaptación):** Desde `481px` (Portrait) y `768px` (Landscape)
  - **Desktop (Alta Fidelidad):** Desde `1024px` hasta ordenadores de `1440px`

### 3. Estrategia de Storybook
- Los estilos específicos de marcos de presentación de Storybook (como `.nav-bar-story` o `.hero-story-board`) se han separado por completo de las hojas de estilos de producción y se han trasladado a archivos `.stories.css` dedicados, garantizando que el CSS de producción esté limpio de código de desarrollo.

### 4. TypeScript & Estado Reactivo
- **TravelFilterState.ts:** Centraliza el estado compartido de filtrado de tarjetas a través de un patrón de publicación/suscripción reactivo ligero en TypeScript.
- **Filtrado Bidireccional de Precios:** Soporte completo para rangos de precio mínimos y máximos en tiempo real.
- **Strict Compliance:** Cumplimiento del 100% de TypeScript estricto, declarando listeners explícitos y evitando casts de anulación como `(this as any)`.

### 5. Accesibilidad (A11y)
- Landmark semánticos bien estructurados (`role="list"`, `role="listitem"`, `aria-label`).
- Diálogos modales accesibles implementados con la etiqueta nativa `<dialog>` HTML5.
- Control interactivo mediante teclado (cierre con `Escape`, trampas de foco).
- Anuncios dinámicos en tiempo real con `aria-live="polite"` en el contenedor de tarjetas para cambios de búsqueda y estados vacíos.

---

## Estructura del Proyecto

```text
index.html
src/
  main.ts
  types/
  data/
    cards.ts                  # Mock base de tarjetas de viaje con assets premium
  components/
    atoms/                    # Botón, Icono, Etiquetas
    molecules/                # Tarjeta de Viaje, Popover de Desglose, Modal de Reserva, OverlayManager
    organisms/                # Header, Hero Slider, SearchBar, FilterPanel, CardsGrid, Footer
  styles/
    tokens.css                # Paleta y tokens
    base.css                  # Reset y utilidades
    layout.css                # Grid principal
    components.css            # Estilos de componentes en producción
    components.stories.css    # Estilos exclusivos de Storybook
  assets/                     # Logotipos e imágenes optimizadas del catálogo
.storybook/                   # Configuración del entorno Storybook
```

---

## Instalación y Ejecución

### 1. Instalación de dependencias
```bash
npm install
```

### 2. Levantar el entorno de desarrollo local (Vite)
```bash
npm run dev
```

### 3. Ejecutar Storybook (Taller de Componentes)
```bash
npm run storybook
```

### 4. Compilar para producción (Build)
```bash
npm run build
```

### 5. Validar tipos de TypeScript
```bash
npm run typecheck
```
