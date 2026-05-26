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
- [ ] Crear componente/recurso de `Icon` vectorial (SVGs inline)
  - [ ] Crear historias de Storybook para visualización
- [ ] Crear componente `Button` (Botonera principal)
  - [ ] Diseñar estados: hover, active, focus-visible, disabled
  - [ ] Crear historias en Storybook con variantes de color y tamaño
- [ ] Crear componentes de control `Checkbox` e inputs
  - [ ] Añadir etiquetas accesibles y focus-visible
  - [ ] Documentar en Storybook
- [ ] Ejecutar auditoría a11y inicial con addon-a11y en los Atoms

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
