# Figma Investigation

Figma file:

- Name: `Prueba Acceso DUX--Copy-`
- File key: `0PM0v0yCjLQ7HDZSdCIvjE`

## Relevant Pages

The file contains multiple pages. The implementation target appears to be:

- `0:1` - `🖥️ 📱 Desktop, tablet & mobile`

The normal metadata call initially listed only the first loaded page (`🌠 Cover`). A read-only Figma Plugin API inspection confirmed the full file structure and found the implementation frames.

## Primary Home Frames

These are the likely source frames for the responsive home page:

| Device | Frame | Node ID | Size |
| --- | --- | --- | --- |
| Desktop | `Home Desktop` | `2002:5342` | `1440 x 2222` |
| Tablet large | `Home Tablet (large)` | `2002:5373` | `1023 x 2226` |
| Tablet small | `Home Tablet (small)` | `2042:31177` | `744 x 2622` |
| Mobile full page | `Home Mobile` | `2002:5400` | `390 x 3620` |

## Additional Frames To Clarify

The same page also includes these frames, which may represent viewport captures, filter states, or interaction variants:

| Frame | Node ID | Size | Note |
| --- | --- | --- | --- |
| `Mobile` | `2042:29609` | `390 x 844` | Mobile viewport/state variant |
| `Tablet (filters)` | `2011:93246` | `1023 x 2226` | Tablet filter state |
| `Tablet (filters)` | `2011:93268` | `744 x 2622` | Small tablet filter state |
| `Mobile` | `2145:171087` | `390 x 844` | Mobile filter/state variant |
| `Contexto prueba` | `6080:6654` | `1800 x 3171` | Assignment context/spec frame |

## Implementation Implications

- The responsive page should target at least the desktop, tablet, and mobile home frames.
- The presence of large and small tablet frames suggests two tablet breakpoints should be considered, not a single tablet width.
- The filter-state frames likely indicate expected interactive behavior or a visual state that should be reviewed before deciding the JavaScript scope.
- Before implementation, capture screenshots and design context for the primary home frames, then inspect the filter-state frames enough to decide whether they are required deliverables or references only.

## Phase 4 Visual Review Notes

The organism review was performed with the Figma file open in the Codex in-app browser and Storybook running locally. The Figma MCP structured metadata endpoint was unavailable during the review because the file reached the Starter plan MCP call limit.

Review findings fixed in the implementation:

- Hero slider controls were added so the Storybook organism exposes real carousel behavior, not just static dots.
- CardsGrid card sizing was adjusted to match the visible Figma card reference of `360 x 404` on desktop.
- Card footers now align consistently across rows even when card title text wraps differently.
- CardsGrid Storybook no longer forces a fixed `900px` width, so responsive checks at `390px` and `744px` do not create false horizontal overflow.
- SearchBar standalone Storybook no longer inherits the negative overlap used only in page composition.
- FilterPanel now has a valid default Storybook story route.
