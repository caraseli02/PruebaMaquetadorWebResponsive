# Prueba Acceso DUX

Proyecto para una prueba tecnica de maquetacion web responsive basada en un diseno Figma.

## Objetivo

Construir una home responsive, funcional y mantenible, optimizada para escritorio, tablet y movil.

La definicion detallada del objetivo esta en [`docs/goal.md`](docs/goal.md).

## Stack

- Vite
- TypeScript
- Storybook
- HTML semantico
- CSS modular con custom properties

La justificacion tecnica esta documentada en [`docs/technical-approach.md`](docs/technical-approach.md).

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Storybook

```bash
npm run storybook
```

## Build

```bash
npm run build
```

## Plan de trabajo

El plan de implementacion esta documentado en [`docs/implementation-plan.md`](docs/implementation-plan.md).

La investigacion inicial de Figma esta en [`docs/figma-investigation.md`](docs/figma-investigation.md).

## Estado actual

La implementacion visual ya cubre las capas de Brand, Atoms, Molecules y Organisms, y la home responsive esta compuesta con datos mock y filtrado local en TypeScript.

Incluye:

- Header responsive con navegacion desktop y menu hamburguesa accesible.
- Hero con imagen de fondo, CTAs y controles reales de slider.
- SearchBar responsive con campos atomicos y resumen inferior.
- FilterPanel como sidebar desktop y dialog nativo en mobile.
- CardsGrid con tarjetas alineadas a la referencia Figma de `360 x 404`.
- Popover de desglose de precio y modal de reserva.
- Footer responsive con enlaces, logo y datos de contacto.

Comandos verificados:

```bash
npm run typecheck
npm run build
```

La revision visual mas reciente se hizo en el navegador interno de Codex con Storybook en `390px`, `744px`, `1023px` y `1440px`, comprobando ausencia de overflow horizontal en los organismos revisados.

## Notas

El Figma MCP alcanzo el limite del plan Starter durante la revision final, asi que la comparacion de organismos se hizo con el archivo abierto en el navegador interno de Codex y con medidas visuales de Storybook. El siguiente bloque de trabajo recomendado es la fase de calidad: accesibilidad completa, foco de dialogs y validacion final de Storybook/build.
