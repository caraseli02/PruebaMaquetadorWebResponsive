# Prueba Acceso DUX — Catálogo de Viajes

Maqueta web responsive de alta fidelidad basada en un diseño Figma. Catálogo de viajes de aventura y cultura construido con **Vanilla HTML/CSS + TypeScript modular**. Sin frameworks, sin dependencias de UI externas.

**Stack:** Vite + TypeScript + Storybook + CSS Custom Properties + Atomic Design

---

## Arquitectura General

La aplicación sigue el patrón **Atomic Design** (Atoms → Molecules → Organisms) con un **estado centralizado reactivo** (`TravelFilterState`) que orquesta toda la comunicación entre componentes mediante pub/sub.

```
┌──────────────────────────────────────────────────────────────────┐
│                        index.html                                │
│  <header>  <hero>  <search-bar>  <filters>  <grid>  <footer>    │
└──────┬──────────┬──────────┬──────────┬──────────┬──────────────┘
       │          │          │          │          │
┌──────▼──────────▼──────────▼──────────▼──────────▼──────────────┐
│                         main.ts                                  │
│  Bootstrap: hydrateIcons → bindHeader → bindHero → initFilters  │
│                        → subscribe → mountGrid                  │
└──────────┬──────────┬──────────┬────────────────────────────────┘
           │          │          │
     ┌─────▼────┐ ┌───▼────┐    │
     │  Header  │ │  Hero   │    │        Componentes estáticos
     │(organism)│ │(organism)│   │        (sin conexión al estado)
     └──────────┘ └────────┘    │
                                │
     ┌──────────────┐  ┌───────▼────────┐
     │  SearchBar   │  │ TravelFilter   │
     │  (organism)  ├──►    State       │
     └──────────────┘  │  (pub/sub)     │
     ┌──────────────┐  │                │
     │ FilterPanel  ├──►  Central hub   │
     │  (organism)  │  │                │
     └──────────────┘  └───────┬────────┘
         ESCRIBE estado       │ notify()
                             │
                    ┌────────▼─────────┐
                    │   CardsGrid      │
                    │   (organism)     │
                    │   SE LEE estado  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐ ┌─────▼──────┐ ┌────▼──────────┐
        │CircuitCard│ │  Pricing   │ │   Booking     │
        │ (molecule)│ │  Popover   │ │   Dialog      │
        │           │ │ (molecule) │ │  (molecule)   │
        └───────────┘ └────────────┘ └───────────────┘
              │              │              │
        ┌─────▼─────┐       │              │
        │BottomBar  │       │              │
        │CircuitCard│       │              │
        │ (molecule)│       │              │
        └───────────┘       │              │
                            ▼              ▼
                    ┌───────────────────────────┐
                    │    OverlayManager         │
                    │    (singleton molecule)   │
                    │  Controla popovers y      │
                    │  diálogos modales         │
                    └───────────────────────────┘
```

---

## Secuencia de Arranque (`main.ts`)

El archivo `main.ts` es el **orchestrator** de toda la aplicación. Se ejecuta en `DOMContentLoaded`:

```
1. Importar CSS en cascada: tokens → base → layout → components
2. hydrateIcons()        → Reemplaza <span data-icon> por SVGs inline
3. bindHeader()          → Toggle menú móvil + Escape para cerrar
4. bindHero()            → Slider de imágenes con controles prev/next
5. new TravelFilterState()  → Instancia central de estado
6. bindSearchBar(state)  → Conecta input de destino al estado
7. Crear Popover + BookingDialog → Se montan en #app-overlays
8. Crear FilterPanel x2  → Inline (desktop) + Dialog (mobile)
9. filterState.subscribe() → Listener principal: re-renderiza CardsGrid
10. Fade-out del skeleton loader global
```

**Punto clave:** La suscripción en paso 9 es el corazón reactivo. Cada cambio de estado dispara un `replaceChildren()` completo del grid con las tarjetas filtradas.

---

## Componentes — Catálogo Completo

### Organisms (secciones de página)

| Componente | Archivo | Renderiza | Conectado al estado |
|---|---|---|---|
| **Header** | `organisms/Header/Header.ts` | Nav, logo, menú móvil hamburguesa | No |
| **Hero** | `organisms/Hero/` (bind en main.ts) | Slider de imágenes + indicadores | No |
| **SearchBar** | `organisms/SearchBar/SearchBar.ts` | Input destino, fechas, huéspedes, botón buscar | **Sí** (escritor) |
| **FilterPanel** | `organisms/FilterPanel/FilterPanel.ts` | Checkboxes destinos, actividades, ratings, precios | **Sí** (escritor) |
| **CardsGrid** | `organisms/CardsGrid/CardsGrid.ts` | Grid de tarjetas + estado vacío | **Sí** (lector) |
| **Footer** | `organisms/Footer/Footer.ts` | Enlaces, copyright, redes sociales | No |

### Molecules (componentes compuestos)

| Componente | Archivo | Renderiza | Interactúa con |
|---|---|---|---|
| **CircuitCard** | `molecules/CircuitCard.ts` | Imagen, título, metadatos, tags, rating | BottomBarCircuitCard |
| **BottomBarCircuitCard** | `molecules/BottomBarCircuitCard.ts` | Precio + botones "Ver desglose" / "Reservar" | Callbacks hacia CardsGrid |
| **PricingPopover** | `molecules/Popover.ts` | Desglose de precio flotante con posicionamiento | OverlayManager |
| **BookingDialog** | `molecules/BookingDialog.ts` | Modal nativo `<dialog>` con formulario reserva | OverlayManager |
| **OverlayManager** | `molecules/OverlayManager.ts` | Gestión centralizada de popovers y modales | DOM global |
| **TagBar** | `molecules/TagBar.ts` | Colección de etiquetas | Tags (atoms) |
| **FooterContent** | `molecules/FooterContent.ts` | Columnas de enlaces del footer | Icon, Link atoms |

### Atoms (elementos indivisibles)

| Componente | Archivo | Patrón |
|---|---|---|
| **Button** | `atoms/Button.ts` | Función pura → `HTMLButtonElement` |
| **Icon** | `atoms/Icon.ts` | Función pura → `SVGSVGElement` inline |
| **TextInput** | `atoms/TextInput.ts` | Función pura → `HTMLInputElement` con label |
| **Tag** | `atoms/Tag.ts` | Función pura → `HTMLSpanElement` con estilo |
| **SliderIndicator** | `atoms/SliderIndicator.ts` | Función pura → dots con callback `onDotClick` |
| **Tabs** | `atoms/Tabs.ts` | Función pura → pestañas con callback `onTabChange` |
| **InfoTooltip** | `atoms/InfoTooltip.ts` | Función pura → tooltip accesible |
| **CircuitCardGridTitle** | `atoms/CircuitCardGridTitle.ts` | Función pura → título de sección del grid |

**Patrón unificado en atoms:** Todos son **funciones puras** que reciben props y retornan elementos DOM. Sin estado interno, sin side effects.

---

## Flujos de Datos — Diagramas Detallados

### Flujo 1: Búsqueda por destino

```
Usuario escribe "Japón"
       │
       ▼
┌─────────────────┐
│  SearchBar       │  bindSearchBar() en main.ts
│  destinationField│  escucha click en .search-bar__btn
└────────┬────────┘
         │  filterState.setSearch("Japón")
         ▼
┌─────────────────┐
│ TravelFilterState│  Actualiza state.search
│                  │  Compara con valor anterior (no-change = skip)
│    notify()      │  Recorre todos los listeners suscritos
└────────┬────────┘
         │  (state, filteredCards)
         ▼
┌─────────────────┐
│   main.ts       │  Suscriptor principal
│   subscribe()   │  Calcula gridTitle = "Resultados de: Japón"
└────────┬────────┘
         │  createCardsGrid({ cards: filteredCards, title })
         ▼
┌─────────────────┐
│   CardsGrid     │  contentContainer.replaceChildren(grid)
│   aria-live     │  Screen readers anuncian cambio automáticamente
└─────────────────┘
```

### Flujo 2: Filtros laterales (destinos, actividades, precios, ratings)

```
Usuario marca checkbox "Tailandia"
       │
       ▼
┌─────────────────┐
│  FilterPanel     │  checkbox change event
│  (inline/desktop)│  o FilterPanel (dialog/mobile)
└────────┬────────┘
         │  filterState.toggleDestination("Tailandia")
         ▼
┌─────────────────┐
│ TravelFilterState│  Toggle en Set → add o delete
│                  │  state.destinations = [...set]
│    notify()      │  getFilteredCards() aplica TODOS los filtros
└────────┬────────┘
         │  Filtrado AND: search AND destinations AND
         │            activities AND price AND ratings
         ▼
┌─────────────────┐
│   CardsGrid     │  Re-renderiza solo con tarjetas que cumplen
│                  │  TODOS los criterios activos simultáneamente
└─────────────────┘
```

### Flujo 3: Desglose de precio (Popover)

```
Usuario hace click en "Ver desglose"
       │
       ▼
┌─────────────────┐
│ BottomBarCircuit │  onDetailsClick(card, event)
│  Card            │  Callback propagado desde CardsGrid
└────────┬────────┘
         │  showPricingPopover(card, triggerEl)
         │  (definido en main.ts)
         ▼
┌─────────────────┐
│ createPopover()  │  Genera nuevo popover con datos de la tarjeta
│                  │  popover.replaceWith(nextPopover)
└────────┬────────┘
         │  OverlayManager.openPopover(popover, triggerEl)
         ▼
┌─────────────────┐
│ OverlayManager   │  Posicionamiento inteligente:
│ (singleton)      │  • Desktop: absolute, clamp al viewport
│                  │  • Mobile: full-width, body.no-scroll
│                  │  Listeners: click-outside + Escape
└─────────────────┘
```

### Flujo 4: Reservar viaje (BookingDialog)

```
Usuario hace click en "Reservar"
       │
       ▼
┌─────────────────┐
│ BottomBarCircuit │  onBookClick(card, event)
│  Card            │  Callback propagado desde CardsGrid
└────────┬────────┘
         │  bookingDialog.show(card)
         │  (instancia creada en main.ts)
         ▼
┌─────────────────┐
│ BookingDialog    │  Rellena datos de la tarjeta en el formulario
│ <dialog> nativo  │  dialog.showModal()
└────────┬────────┘
         │  OverlayManager.openModal(dialog)
         ▼
┌─────────────────┐
│ OverlayManager   │  body.classList.add("no-scroll")
│                  │  Escape → dialog.close() → removeListener
│                  │  Backdrop click → dialog.close()
└─────────────────┘
         │  Usuario envía formulario
         ▼
┌─────────────────┐
│ BookingDialog    │  Validación inline
│  submit handler  │  Mensaje de confirmación
│                  │  dialog.close() automático
└─────────────────┘
```

---

## Estado Centralizado — TravelFilterState

### Patrón: Pub/Sub reactivo ligero

```
                    ┌─────────────────────────────┐
   ESCRITORES       │     TravelFilterState        │   LECTOR
                    │                              │
  ┌──────────┐      │  state: {                    │    ┌──────────┐
  │SearchBar │──────►    search: string,           │    │CardsGrid │
  └──────────┘      │    destinations: string[],   │    └──────────┘
  ┌──────────┐      │    activities: string[],     │         ▲
  │FilterPanel─────►    minPrice: number,          │         │
  │ (x2 inst.)│      │    maxPrice: number,        │    notify(state,
  └──────────┘      │    ratings: string[]         │    filteredCards)
                    │  }                           │
                    │                              │
                    │  subscribe(listener) → unsub │
                    │  setSearch / toggle* / set*  │
                    │  clearAll / getState         │
                    └─────────────────────────────┘
```

### API pública

| Método | Acción | Dispara notify? |
|---|---|---|
| `subscribe(listener)` | Registra callback, ejecuta inmediatamente con estado actual | Sí (inicial) |
| `setSearch(text)` | Actualiza texto de búsqueda | Solo si cambió |
| `toggleDestination(dest)` | Añade/elimina destino del filtro | Sí |
| `toggleActivity(act)` | Añade/elimina actividad del filtro | Sí |
| `toggleRating(rating)` | Añade/elimina rating del filtro | Sí |
| `setMinPrice(n)` / `setMaxPrice(n)` | Actualiza rango de precios | Solo si cambió |
| `clearAll()` | Reseta todo el estado a valores iniciales | Sí |
| `getState()` | Retorna copia inmutable del estado | No |
| `getFilteredCards()` | Aplica filtros sobre `mockCards` y retorna resultados | No |

### Lógica de filtrado (`getFilteredCards`)

Todas las condiciones se aplican en **AND** (deben cumplirse todas simultáneamente):

```
card pasa el filtro ⇔ matchesSearch ∧ matchesDestination ∧ matchesActivity ∧ matchesPrice ∧ matchesRating

- matchesSearch:     search="" O título/ubicación/región contiene el texto
- matchesDestination: destinations=[] O alguna coincide con location/region
- matchesActivity:   activities=[] O tag está en la lista
- matchesPrice:      precio dentro de [minPrice, maxPrice]
- matchesRating:     ratings=[] O rating ≥ 4.5 (filtro "4.5+")
```

### Ciclo de vida de suscripción

```typescript
// main.ts — Suscriptor principal
filterState.subscribe((state, filteredCards) => {
  // 1. Calcular título del grid según estado activo
  // 2. Crear nuevo CardsGrid con tarjetas filtradas
  // 3. replaceChildren() en el contenedor DOM
});

// SearchBar — Suscriptor secundario (sincroniza input)
filterState.subscribe((state) => {
  if (document.activeElement !== destinationField) {
    destinationField.value = state.search;
  }
});
```

**Importante:** `subscribe()` ejecuta el callback inmediatamente con el estado actual. Esto garantiza que el grid se renderiza en el primer frame sin necesidad de un render manual inicial.

---

## Matriz de Interacción entre Componentes

|               | Header | Hero | SearchBar | FilterPanel | FilterState | CardsGrid | CircuitCard | BottomBar | Popover | BookingDialog | OverlayMgr |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Header**    | — | · | · | · | · | · | · | · | · | · | · |
| **Hero**      | · | — | · | · | · | · | · | · | · | · | · |
| **SearchBar** | · | · | — | · | **escritor** | · | · | · | · | · | · |
| **FilterPanel** | · | · | · | — | **escritor** | · | · | · | · | · | · |
| **FilterState** | · | · | · | · | — | **notifica** | · | · | · | · | · |
| **CardsGrid** | · | · | · | · | **lector** | — | **crea** | **crea** | · | · | · |
| **CircuitCard** | · | · | · | · | · | · | — | **contiene** | · | · | · |
| **BottomBar** | · | · | · | · | · | · | · | — | · | · | · |
| **Popover**   | · | · | · | · | · | · | · | · | — | · | **usa** |
| **BookingDialog** | · | · | · | · | · | · | · | · | · | — | **usa** |
| **OverlayMgr** | · | · | · | · | · | · | · | · | **gestiona** | **gestiona** | — |

**Leyenda:** `escritor` = muta el estado, `lector` = se suscribe, `notifica` = emite cambios, `crea` = instancia el componente, `contiene` = lo anida como hijo, `usa/gestiona` = delega overlay management.

---

## Arquitectura CSS — Cascada de Tokens

```
tokens.css              → Variables raíz: colores, espaciado, tipografía, sombras
    │
    ▼
base.css                → Reset global, font-face, utilidades (.no-scroll)
    │
    ▼
layout.css              → Grid principal, containers, columnas responsive
    │
    ▼
components.css          → Estilos de componentes atómicos y moleculares
    │
    ├── Header.css      → Estilos co-localizados del organismo Header
    ├── Hero.css        → Estilos co-localizados del organismo Hero
    ├── SearchBar.css   → Estilos co-localizados del organismo SearchBar
    ├── Footer.css      → Estilos co-localizados del organismo Footer
    └── CardsGrid.css   → Estilos co-localizados del organismo CardsGrid
```

### Sistema responsive (Mobile-First)

```
Base (móvil)      → Sin media query, estilos por defecto
├── min-width: 481px   → Tablet portrait (ajustes de layout)
├── min-width: 768px   → Tablet landscape (2 columnas, sidebar)
├── min-width: 1024px  → Desktop (3 columnas, layout completo)
└── min-width: 1440px  → Desktop grande (max-width container)
```

### Nomenclatura CSS

- **BEM-inspired:** `.cards-grid`, `.cards-grid__empty`, `.cards-grid__empty-icon`
- **Component-scoped:** Cada componente tiene su propio namespace
- **Especificidad limpia:** Sin `!important`. Override con clases compuestas: `.header__toggle.dux-button`
- **Custom Properties:** `var(--color-orange-500)`, `var(--spacing-md)`, `var(--radius-lg)`

---

## Arquitectura de Accesibilidad

### Landmarks semánticos

```
<body>
  <header>          → role="banner"     (navegación principal)
  <main>
    <section>       → Hero              (aria-label en slider)
    <section>       → SearchBar         (formulario con label)
    <section>       → Filtros + Grid
      <aside>       → FilterPanel       (sidebar desktop)
      <dialog>      → FilterPanel       (modal mobile)
      <div>         → CardsGrid         (aria-live="polite")
  </main>
  <footer>          → role="contentinfo"
</body>
```

### Regiones ARIA live

| Elemento | Atributo | Propósito |
|---|---|---|
| `#cards-grid-container-el` | `aria-live="polite"` | Anunciar cambios de tarjetas filtradas |
| CardsGrid vacío | Texto "No se encontraron viajes" | Screen reader lo lee automáticamente |

### Navegación por teclado

| Elemento | Tecla | Acción |
|---|---|---|
| Menú móvil hamburguesa | `Escape` | Cierra menú, foco al toggle |
| Popover de precios | `Escape` | Cierra popover, foco al trigger |
| BookingDialog | `Escape` | Cierra modal (`<dialog>` nativo) |
| FilterPanel móvil | `Escape` | Cierra diálogo de filtros |
| Popover de precios | Click fuera | Cierra popover |
| BookingDialog | Click backdrop | Cierra modal |

### Focus management

- **OverlayManager** restaura el foco al elemento trigger al cerrar popover
- Menú móvil mueve foco al primer enlace al abrirse
- `<dialog>` nativo gestiona focus trap automáticamente

---

## Estructura del Proyecto

```
vienna/
├── index.html                         # Página única con estructura semántica
├── package.json                       # Dependencias: vite, typescript, storybook
├── tsconfig.json                      # TypeScript strict mode
├── vite.config.ts                     # Configuración Vite
├── .storybook/                        # Configuración Storybook
│
├── src/
│   ├── main.ts                        # ← ORCHESTRATOR: arranque y wiring completo
│   │
│   ├── types/
│   │   └── index.ts                   # Interface CardData (id, title, location, region...)
│   │
│   ├── data/
│   │   └── cards.ts                   # mockCards: array estático de viajes de catálogo
│   │
│   ├── components/
│   │   ├── atoms/                     # Funciones puras → elementos DOM
│   │   │   ├── Button.ts              # createButton(props) → HTMLButtonElement
│   │   │   ├── Icon.ts                # createIcon(props) → SVGSVGElement
│   │   │   ├── TextInput.ts           # createTextInput(props) → HTMLInputElement
│   │   │   ├── Tag.ts                 # createTag(props) → HTMLSpanElement
│   │   │   ├── SliderIndicator.ts     # createSliderIndicator(props) → HTMLElement
│   │   │   ├── Tabs.ts                # createTabs(props) → HTMLElement
│   │   │   ├── InfoTooltip.ts         # createInfoTooltip(props) → HTMLElement
│   │   │   └── CircuitCardGridTitle.ts # createCircuitCardGridTitle(props) → HTMLElement
│   │   │
│   │   ├── molecules/                 # Componentes compuestos con lógica
│   │   │   ├── CircuitCard.ts         # Tarjeta de viaje con imagen + metadatos
│   │   │   ├── BottomBarCircuitCard.ts # Barra inferior: precio + acciones
│   │   │   ├── Popover.ts             # Desglose de precio flotante
│   │   │   ├── BookingDialog.ts       # Modal de reserva con formulario
│   │   │   ├── OverlayManager.ts      # Singleton: gestión de popovers y modales
│   │   │   ├── TagBar.ts              # Barra de etiquetas
│   │   │   └── FooterContent.ts       # Contenido del footer
│   │   │
│   │   └── organisms/                 # Secciones completas de página
│   │       ├── Header/                # Navegación + menú móvil
│   │       │   ├── Header.ts
│   │       │   └── Header.css
│   │       ├── Hero/                  # Slider de imágenes destacadas
│   │       ├── SearchBar/             # Barra de búsqueda conectada al estado
│   │       │   └── SearchBar.ts
│   │       ├── FilterPanel/           # Panel de filtros (inline + dialog mode)
│   │       │   ├── FilterPanel.ts     # Dos modos: inline (desktop) / dialog (mobile)
│   │       │   └── TravelFilterState.ts # ← STATE HUB: pub/sub centralizado
│   │       ├── CardsGrid/             # Grid de tarjetas reactivo
│   │       │   ├── CardsGrid.ts
│   │       │   └── CardsGrid.css
│   │       └── Footer/                # Pie de página
│   │
│   ├── styles/
│   │   ├── tokens.css                 # Design tokens: colores, spacing, typography
│   │   ├── base.css                   # Reset, tipografía base, utilidades
│   │   ├── layout.css                 # Grid principal, containers
│   │   ├── components.css             # Estilos de componentes en producción
│   │   └── components.stories.css     # Estilos exclusivos de Storybook (no producción)
│   │
│   └── assets/                        # Imágenes optimizadas del catálogo
│
└── .context/                          # Contexto compartido entre agentes
```

---

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Desarrollo local con HMR (Vite)
npm run dev

# Taller de componentes aislado (Storybook)
npm run storybook

# Build de producción
npm run build

# Validación de tipos TypeScript
npm run typecheck
```

---

## Decisiones de Diseño Clave

| Decisión | Razón |
|---|---|
| **Sin framework JS** | El alcance (una página, estado simple) no lo justifica. Vanilla TS + pub/sub es suficiente, más rápido y sin overhead de bundle. |
| **Atomic Design** | Separa responsabilidades: atoms (sin estado) → molecules (lógica local) → organisms (secciones de página). Escalable y testeable. |
| **`<dialog>` nativo** | Accesibilidad gratuita: focus trap, Escape, backdrop, ARIA. Sin librería de modals. |
| **OverlayManager singleton** | Un solo punto de control para popovers y modales. Evita z-index wars y gestiona scroll lock de forma centralizada. |
| **`replaceChildren()` para re-render** | Simple y eficiente para el tamaño del dataset. No se necesita virtual DOM. |
| **Pub/sub en lugar de events** | Los CustomEvents bubbling son imprecisos en componentes anidados. Pub/sub garantiza entrega directa al subscriber. |
| **CSS Custom Properties** | Design tokens nativos sin preprocessor. Modificables en runtime, heredables por cascada. |
| **Mobile-first** | Los estilos base son móviles. Desktop se construye progresivamente con `min-width`. Menos override, menos bugs. |
| **Skeleton loader inline** | CSS crítico en `<head>` evita FOUC. Shimmer + fade-out da percepción de velocidad. |
| **Storybook separado** | Estilos de desarrollo (`.stories.css`) nunca llegan a producción. CSS de producción permanece limpio. |
