# Technical Approach

## Stack

Use:

- Vite
- TypeScript
- Storybook
- Semantic HTML
- Modular CSS

## Rationale

The assignment is focused on responsive layout, HTML/CSS quality, accessibility, and maintainable structure. A lean Vite + TypeScript setup keeps the project easy to run and review while avoiding unnecessary framework overhead.

Storybook should be used as a component workshop before assembling the full home page. The Figma file includes `Brand`, `Atoms`, `Molecules`, and `Organisms` pages, so the implementation should mirror that structure and move from tokens to small components to composed sections.

React, Vue, Angular, or a UI component library are not needed unless the Figma inspection reveals complex stateful interactions. For the current scope, the strongest interview signal is clean markup, clear CSS architecture, precise responsive behavior, and a documented component workflow.

## CSS Strategy

- Use CSS custom properties for colors, spacing, typography, shadows, and layout dimensions extracted from Figma.
- Use a mobile-first responsive strategy.
- Use container queries for component-level responsiveness where a component's layout should depend on its parent size.
- Use media queries for page-level layout changes tied to viewport-wide composition.
- Use a BEM-style naming convention for component classes.
- Split CSS by responsibility:
  - `tokens.css`
  - `base.css`
  - `layout.css`
  - `components.css`
  - `responsive.css`

## Responsive Strategy

Use the Figma frames as primary targets:

- Mobile: `390px`
- Tablet small: `744px`
- Tablet large: `1023px`
- Desktop: `1440px`

The implementation should match those target widths while also interpolating sensibly between them.

Container query guidance:

- Define query containers on reusable section/component wrappers, not every element.
- Prefer `container-type: inline-size` for width-driven components.
- Use named containers where nested components would otherwise become ambiguous.
- Keep viewport media queries for global layout decisions such as header mode, page gutters, and full-page section ordering.

## Storybook Strategy

Use Storybook to build and verify the design system before composing the page:

1. Brand tokens
2. Atoms
3. Molecules
4. Organisms
5. Full home page composition

Recommended Storybook setup:

- Vite-backed Storybook.
- Stories colocated with component modules.
- Viewport-focused stories for mobile, tablet, and desktop states.
- Accessibility addon if setup cost stays low.
- Component stories should import the same CSS and assets used by the final page.

## JavaScript / TypeScript Strategy

Use TypeScript only for real behavior, such as:

- Mobile menu toggle
- Filter panel toggle, if required by the Figma states
- Any small interaction explicitly represented in the design

Avoid using TypeScript to manage static layout or content that can be represented directly in HTML.

## Accessibility Strategy

- Use semantic landmarks and heading order.
- Use real links and buttons for interactive controls.
- Provide visible focus states.
- Ensure mobile menu and filter toggles are keyboard accessible if implemented.
- Use meaningful image alt text, or empty alt text for decorative images.
- Avoid hidden interactive content remaining focusable.

## Proposed Structure

```text
index.html
src/
  main.ts
  components/
    atoms/
    molecules/
    organisms/
  styles/
    tokens.css
    base.css
    layout.css
    components.css
    responsive.css
  assets/
.storybook/
stories/
README.md
docs/
  goal.md
  figma-investigation.md
  technical-approach.md
```
