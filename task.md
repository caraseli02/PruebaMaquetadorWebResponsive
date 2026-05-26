# Checklist de Ejecución - Prueba Acceso DUX (Responsive Home Page)

## Fase 1: Fundaciones y Configuración Base
- [x] Validar variables y escala cromática en `src/styles/tokens.css`
  - [x] Escala principal naranja (`--color-orange-500` brand accent)
  - [x] Escala secundaria púrpura (`--color-purple-700` brand color)
  - [x] Variables de spacing, radios de esquina (`--radius-xl` de Figma), sombras, transiciones y tipografía Outfit/Inter
- [x] Configurar reset y base en `src/styles/base.css`
  - [x] Reset CSS moderno y de alta fidelidad
  - [x] Selector `:focus-visible` para indicador de foco accesible y personalizado
  - [x] Importación y definición de tipografía principal (Outfit / Inter)
  - [x] Configuración de barras de scroll premium y selección de texto customizada

## Fase 2: Componentes Atómicos (Atoms)
- [ ] **Icon (Iconografía Vectorial)**
  - [ ] Implementar recurso/componente de icono vectorial (SVG inline)
  - [ ] Extraer y definir paths para los 15 iconos exactos de Figma (mostrados en la guía de átomos):
    - [ ] `ChevronRight`: Flecha angular naranja hacia la derecha (`>`)
    - [ ] `Menu`: Menú hamburguesa (3 líneas horizontales para navegación móvil)
    - [ ] `Close`: Cruz de cierre o cancelación (`x`)
    - [ ] `Heart`: Corazón de favoritos (outline)
    - [ ] `Landscape` / `Mountain`: Montaña con sol (icono de paisaje/actividades de montaña)
    - [ ] `Globe`: Globo terráqueo/planeta con meridianos (estilo línea)
    - [ ] `Printer`: Impresora (icono de impresión/servicios)
    - [ ] `Markers` / `Surfboards`: Dos marcadores/lápices alineados (o tablas de surf)
    - [ ] `World`: Globo terráqueo simplificado con contorno circular
    - [ ] `Home`: Casa/cabaña (icono de hogar/alojamiento)
    - [ ] `ChevronLeft`: Flecha angular naranja hacia la izquierda (`<`)
    - [ ] `TriangleDown`: Triángulo sólido naranja apuntando hacia abajo (`▼`, indicador de dropdown)
    - [ ] `Calendar`: Calendario cuadriculado (fechas/agenda)
    - [ ] `Users` / `People`: Dos siluetas de personas (usuarios/grupo/comunidad)
    - [ ] `Tags` / `PriceTag`: Dos etiquetas de precio inclinadas una sobre otra
    - [ ] `ChevronDown`: Flecha angular naranja apuntando hacia abajo (`v`, en versión delgada y gruesa)
  - [ ] Crear historia en Storybook mostrando una cuadrícula/galería con todos los iconos de interfaz disponibles
- [ ] **Button (Botones de Acción)**
  - [ ] Implementar componente `Button` altamente reusable
  - [ ] Configurar variantes de estilo BEM:
    - [ ] Botón Primario (fondo de color sólido de marca naranja/púrpura)
    - [ ] Botón Secundario (borde delineado / outline)
    - [ ] Botón Ghost / Icon-Button (sin fondo, solo icono, ej. para el cierre de filtros)
  - [ ] Maquetar todos los estados interactivos: `:hover`, `:active`, `:disabled` y anillo `:focus-visible` accesible
  - [ ] Crear historias en Storybook con controles interactivos para probar cada estado y variante
- [ ] **Tabs (Pestañas Segmentadas / Toggles)**
  - [ ] Crear componente `Tabs` para representar controles de selección de rango (ej. "Price Range" / "Narrow Range")
  - [ ] Diseñar variantes de estilo Figma:
    - [ ] Variant `underline`/`outline` (estilo con borde, como "Price Range" con icono de bookmark)
    - [ ] Variant `pill` (estilo pastilla sólida con fondo azul/naranja activo, como "Narrow Range" con icono de bookmark)
  - [ ] Añadir soporte para etiquetas de texto e iconos vectoriales (`Bookmark`) y estados interactivos al hacer clic
  - [ ] Crear historias detalladas en Storybook
- [ ] **Tag (Etiquetas de Metadatos)**
  - [ ] Crear componente `Tag` estático para representar categorías y metadatos pequeños (ej. etiquetas decorativas de tarjetas)
  - [ ] Configurar variantes de color BEM según la escala de Figma
  - [ ] Crear historias en Storybook
- [ ] **TextInput (Campo de Entrada de Texto)**
  - [ ] Crear componente `TextInput` estándar con soporte para placeholders e integración con iconos
  - [ ] Maquetar estados por defecto, foco (`:focus-visible`) y deshabilitado
  - [ ] Crear historias interactivas en Storybook
- [ ] **Checkbox (Casilla de Selección Personalizada)**
  - [ ] Crear componente `Checkbox` utilizando estilos CSS puros para reemplazar el control nativo del navegador
  - [ ] Añadir checkmark vectorial interno y configurar estados `:checked` e indicador `:focus-visible`
  - [ ] Crear historias en Storybook
- [ ] **Tooltip (Burbuja y Tarjeta de Desglose de Precios)**
  - [ ] Crear componente `Tooltip` con dos modos de interacción:
    - [ ] Burbuja informativa estándar al pasar el cursor (hover)
    - [ ] Tarjeta de desglose de precios interactiva al hacer clic (popover con botón de cierre)
  - [ ] Asegurar accesibilidad (roles de tooltip, cierre con tecla Escape y foco visible)
  - [ ] Crear historias en Storybook
- [ ] **Auditoría de Accesibilidad Inicial**
  - [ ] Correr auditoría automatizada `addon-a11y` en Storybook en los 7 Atoms antes de estructurar Molecules

## Fase 3: Componentes Moleculares (Molecules)
- [ ] Crear componente de tarjeta individual `Card`
  - [ ] Implementar marcado semántico (imagen, etiquetas, título, descripción)
  - [ ] Configurar `@container (min-width: ...px)` en los estilos del componente para hacerlo adaptativo a su celda
  - [ ] Crear historias de Storybook con diferentes anchos de contenedor para testear la interpolación elástica
- [ ] Crear componentes auxiliares `FilterGroup` (agrupación de inputs y checkboxes de filtro)
  - [ ] Documentar comportamiento en Storybook

## Fase 4: Secciones de Página (Organisms)
- [ ] Crear sección de cabecera `Header`
  - [ ] Implementar maquetación con logo y navegación
  - [ ] Implementar menú hamburguesa responsive táctil y accesible (teclado + `aria-expanded`)
- [ ] Crear sección de impacto `Hero` con tipografía responsiva (`clamp()`)
- [ ] Crear componente `FilterPanel` (Panel de Filtros)
  - [ ] Implementar barra lateral fija (sidebar) para resolución Desktop (`>= 1024px`)
  - [ ] Implementar modal móvil responsivo usando la etiqueta nativa `<dialog>`
  - [ ] Asegurar botón flotante de apertura y cierre en pantallas pequeñas
- [ ] Crear contenedor `CardsGrid` (Cuadrícula elástica)
  - [ ] Grid responsiva usando columnas elásticas y fraccionales para evitar espacios vacíos huérfanos
- [ ] Crear sección de pie de página `Footer` con enlaces y logos de Figma
- [ ] Documentar e inspeccionar todos los Organisms en Storybook a `390px`, `744px`, `1023px`, `1440px`

## Fase 5: Integración y Lógica TypeScript (Filtros en el Cliente)
- [ ] Crear interfaces en `src/types/index.ts` (`CardData`, etc.)
- [ ] Cargar mock data realista y completo en `src/data/cards.ts`
- [ ] Programar controlador de estado e integrador en `src/main.ts`
  - [ ] Escuchar cambios del `FilterPanel`
  - [ ] Realizar lógica de filtrado de datos local en TypeScript
  - [ ] Disparar el re-renderizado eficiente de `CardsGrid`

## Fase 6: Pruebas de Calidad, Accesibilidad y Verificación Final
- [ ] Testear exhaustivamente el `<dialog>` nativo de filtros en móvil
  - [ ] Validar atrapado de foco (focus trap) en teclado
  - [ ] Validar cierre rápido con la tecla `Escape`
  - [ ] Validar que se bloquea el scroll de fondo
- [ ] Auditar accesibilidad completa (a11y)
  - [ ] Revisar contrastes y semántica con Storybook a11y
  - [ ] Probar navegación por teclado con `:focus-visible` de todos los botones y selectores
- [ ] Validar rendering responsivo y ausencia de desbordamiento horizontal en el navegador
- [ ] Compilar producción (`npm run build`) y verificar que no hay errores de TypeScript o empaquetado
