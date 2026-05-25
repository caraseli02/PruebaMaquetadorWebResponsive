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

La fase actual es de preparacion. Ya estan configurados Vite, TypeScript y Storybook, junto con la estructura inicial de estilos y componentes.

Comandos verificados:

```bash
npm run typecheck
npm run build
npm run build:storybook
```

Todavia no se ha implementado la interfaz visual de Figma. El siguiente paso es extraer tokens y componentes desde las paginas `Brand`, `Atoms`, `Molecules` y `Organisms`.

## Notas

La implementacion visual todavia no ha empezado. El siguiente paso es extraer de Figma los tokens y componentes de las paginas `Brand`, `Atoms`, `Molecules` y `Organisms`, y despues componer la home responsive.
