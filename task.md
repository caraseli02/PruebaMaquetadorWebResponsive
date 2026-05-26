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
  - [ ] Extraer y definir paths para los siguientes iconos de Figma:
    - [ ] `Bookmark` (Marcador/guardado - mostrado en chips de "Price Range" / "Narrow Range")
    - [ ] `Search` (Lupa de búsqueda)
    - [ ] `Filter` (Icono de filtros/embudo)
    - [ ] `Close` (Cruz para cerrar filtros y borrar búsquedas)
    - [ ] `Chevron` (Flecha indicadora para desplegables)
    - [ ] `Star` (Estrella para ratings de tarjetas)
  - [ ] Crear historia en Storybook mostrando una cuadrícula/galería con todos los iconos de interfaz disponibles
- [ ] **Button (Botones de Acción)**
  - [ ] Implementar componente `Button` altamente reusable
  - [ ] Configurar variantes de estilo BEM:
    - [ ] Botón Primario (fondo de color sólido de marca naranja/púrpura)
    - [ ] Botón Secundario (borde delineado / outline)
    - [ ] Botón Ghost / Icon-Button (sin fondo, solo icono, ej. para el cierre de filtros)
  - [ ] Maquetar todos los estados interactivos: `:hover`, `:active`, `:disabled` y anillo `:focus-visible` accesible
  - [ ] Crear historias en Storybook con controles interactivos para probar cada estado y variante
- [ ] **TextInput & SearchInput (Campos de Entrada)**
  - [ ] Crear componente `TextInput` estándar con soporte para placeholders y estados de foco
  - [ ] Crear componente `SearchInput` que integre el icono de lupa (`Search`) a la izquierda y un botón de cruz (`Close`) a la derecha para limpiar el texto
  - [ ] Asegurar accesibilidad total (etiquetas para lectores de pantalla y foco visual `:focus-visible`)
  - [ ] Crear historias interactivas en Storybook
- [ ] **Checkbox & Radio (Selectores de Lista)**
  - [ ] Crear componentes de control `Checkbox` y `Radio` personalizados en CSS puro (reemplazando los selectores nativos por cajas decoradas de Figma)
  - [ ] Asegurar que respondan dinámicamente al estado `:checked` y tengan anillo de foco `:focus-visible`
  - [ ] Crear historias detalladas en Storybook para estados marcados/no-marcados
- [ ] **Chip & Tag (Etiquetas y Chips de Filtro Seleccionables)**
  - [ ] Crear componente `Tag` estático para metadatos (ej. tags de tarjetas)
  - [ ] Crear componente `Chip` interactivo y seleccionable (ej. "Price Range" con icono de bookmark y fondo transparente/borde; "Narrow Range" con icono de bookmark y fondo sólido azul/naranja activo)
  - [ ] Crear componente `Chip` descartable (con un botón de cruz a la derecha para quitar filtros activos)
  - [ ] Documentar en Storybook todos los estados: por defecto, seleccionado, hover y descartable
- [ ] **Rating (Calificador por Estrellas)**
  - [ ] Crear componente `Rating` para renderizar estrellas (vacías/llenas) según una puntuación numérica (ej. 4.5 estrellas)
  - [ ] Documentar en Storybook
- [ ] **Auditoría de Accesibilidad Inicial**
  - [ ] Correr auditoría automatizada `addon-a11y` en Storybook para garantizar que todos los Atoms cumplen con la semántica básica de colores y focos antes de subir a Molecules

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
