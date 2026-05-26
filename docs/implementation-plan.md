# Implementation Plan

## 1. Design-System Inventory

Before implementing the full page, inspect the Figma design-system pages:

- `🏳️ Brand`
- `🔬 Atoms`
- `🧬 Molecules`
- `🌱 Organisms`
- `🖥️ 📱 Desktop, tablet & mobile`

The implementation should progress from foundational tokens and small components to composed page sections.

Figma MCP note: a detailed inventory call hit the Figma Starter plan MCP rate limit during planning. Continue with targeted extraction calls when the limit resets, prioritizing the specific nodes needed for the next implementation slice.

## 2. Brand Tokens

Extract from `🏳️ Brand`:

- Colors
- Typography
- Logo assets
- Spacing and radius conventions
- Any reusable shadows, borders, or surface styles

Implement as:

- `src/styles/tokens.css`
- `src/styles/base.css`
- asset files under `src/assets/`

Create Storybook documentation/stories for visual token review where useful.

## 3. Atoms

Extract and implement small reusable primitives from `🔬 Atoms`, likely including:

- Icons
- Buttons
- Tags
- Titles
- Tabs
- Text inputs
- Checkbox controls
- Slider indicators
- Tooltips, if used in the home page

Each atom should have:

- A focused implementation file
- A Storybook story
- Relevant states from Figma, such as default, hover, focus, active, disabled, and selected where applicable
- Accessible markup and focus styles

## 4. Molecules

Extract and implement composed components from `🧬 Molecules`, likely including:

- Footer content
- Card content
- Tag bar
- Card row

Each molecule should be built from atoms where practical and verified in Storybook across narrow and wide containers.

Use container queries here when the component needs to adapt to its available width.

## 5. Organisms

Extract and implement larger sections from `🌱 Organisms`, likely including:

- Header/navigation
- Hero
- Search/filter surfaces
- Card/listing sections
- Footer

Each organism should have Storybook stories for relevant responsive states before it is used in the full page.

Use container queries for section internals and media queries only when the full page composition needs to change by viewport.

Current implementation status:

- Header, Hero, SearchBar, FilterPanel, CardsGrid, Footer, pricing popover, and booking dialog are implemented.
- Hero now includes functional slider controls and active indicator state rather than static dots only.
- CardsGrid stories use fullscreen responsive review and card dimensions are aligned to the Figma card reference of `360 x 404` on desktop.
- FilterPanel has a default Storybook route in addition to sidebar and mobile dialog examples.

## 6. Full Page Figma Extraction

Use the primary home frames from `docs/figma-investigation.md`:

- Desktop: `2002:5342`
- Tablet large: `2002:5373`
- Tablet small: `2042:31177`
- Mobile full page: `2002:5400`

For each primary frame:

- Fetch design context.
- Capture a screenshot.
- Identify reusable sections and components.
- Extract assets, colors, typography, spacing, and layout dimensions.

Also inspect the filter/state frames enough to decide whether JavaScript behavior is required:

- `2011:93246`
- `2011:93268`
- `2145:171087`
- `2042:29609`

## 7. Project Setup

Create a Vite + TypeScript project in the current repository.

Expected files:

- `index.html`
- `src/main.ts`
- `src/components/atoms/`
- `src/components/molecules/`
- `src/components/organisms/`
- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/layout.css`
- `src/styles/components.css`
- `src/styles/responsive.css`
- `src/assets/`
- `.storybook/`
- Story files for implemented components
- `README.md`

## 8. Page Assembly

After Brand, Atoms, Molecules, and Organisms are implemented and reviewed in Storybook, assemble the page in vertical sections:

1. Header/navigation
2. Hero
3. Main search or filter surface, if present
4. Main content/cards/listing sections
5. Footer

Use semantic HTML landmarks and section headings. Keep layout CSS separate from component styling where practical.

## 9. Responsive Implementation

Work mobile-first. Use:

- Container queries for reusable components and sections.
- Media queries for page-level layout changes.

Viewport targets:

- `744px`
- `1023px`
- `1440px`

Verify that the layout:

- Matches the Figma target frames.
- Does not overflow horizontally.
- Does not overlap or clip content.
- Keeps text readable and controls usable.

## 10. Interaction Implementation

Only add TypeScript where the Figma states justify it.

Potential interactions:

- Mobile menu toggle
- Filter panel toggle
- Filter state display
- Hero slider navigation
- Price breakdown popover
- Booking dialog

All interactions must be accessible by keyboard and expose the correct ARIA state when applicable.

## 11. Verification

Run local verification at these viewport widths:

- `390px`
- `744px`
- `1023px`
- `1440px`

Check:

- Visual alignment against Figma screenshots
- Console errors
- Horizontal overflow
- Keyboard navigation for interactive controls
- Production build
- Storybook stories for component states
- Storybook accessibility checks where configured

Latest verification checkpoint:

- `npm run typecheck`
- `npm run build`
- Codex in-app browser review of organism Storybook routes at `390px`, `744px`, `1023px`, and `1440px`
- CardsGrid confirmed without horizontal overflow and with consistent card/footer baselines after the phase-4 review fixes

## 12. README

Document:

- Technical decisions
- Project structure
- Install command
- Development command
- Build/preview command
- Responsive strategy
- Accessibility notes
- Storybook/component workflow
- Container query strategy
- Any known assumptions or deviations from Figma

## 13. Final Review

Review the completed work against:

- `docs/goal.md`
- Assignment requirements
- Figma screenshots
- Local build and browser verification results
