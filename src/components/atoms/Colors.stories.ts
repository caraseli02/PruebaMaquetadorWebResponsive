export default {
  title: 'Brand/Colors',
  parameters: {
    layout: 'centered',
  },
};

const createColorSwatch = (varName: string, label: string) => {
  return `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div style="width: 80px; height: 80px; border-radius: 8px; background-color: var(${varName}); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm);"></div>
      <span style="font-size: var(--font-size-2xs); font-family: var(--font-sans); font-weight: var(--weight-semibold); color: var(--color-text-main);">${label}</span>
      <code style="font-size: 10px; color: var(--color-text-muted);">${varName}</code>
    </div>
  `;
};

const createColorSection = (title: string, swatches: string[]) => {
  return `
    <section style="margin-bottom: 32px; font-family: var(--font-sans);">
      <h3 style="margin-bottom: 16px; border-bottom: 2px solid var(--color-border); padding-bottom: 8px;">${title}</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 20px;">
        ${swatches.join('')}
      </div>
    </section>
  `;
};

export const Palette = () => {
  const container = document.createElement('div');
  container.style.padding = '40px';
  container.style.maxWidth = '1000px';
  container.style.backgroundColor = 'var(--color-bg-main)';
  container.style.borderRadius = 'var(--radius-lg)';

  const primaryOrange = createColorSection('Primary Orange (Accent)', [
    createColorSwatch('--color-orange-100', 'Lightest'),
    createColorSwatch('--color-orange-200', 'Peach'),
    createColorSwatch('--color-orange-500', 'Orange (Brand)'),
    createColorSwatch('--color-orange-600', 'Accent Hover'),
    createColorSwatch('--color-orange-700', 'Accent Active'),
    createColorSwatch('--color-orange-800', 'Dark Orange'),
    createColorSwatch('--color-orange-900', 'Burnt Orange'),
    createColorSwatch('--color-orange-950', 'Darkest'),
  ]);

  const secondaryPurple = createColorSection('Secondary Purple (Theme)', [
    createColorSwatch('--color-purple-100', 'Lightest'),
    createColorSwatch('--color-purple-200', 'Lavender'),
    createColorSwatch('--color-purple-300', 'Soft Plum'),
    createColorSwatch('--color-purple-400', 'Light Purple'),
    createColorSwatch('--color-purple-500', 'Medium Purple'),
    createColorSwatch('--color-purple-600', 'Deep Purple'),
    createColorSwatch('--color-purple-700', 'Plum (Brand)'),
    createColorSwatch('--color-purple-800', 'Dark Plum'),
    createColorSwatch('--color-purple-900', 'Darkest Purple'),
  ]);

  const grayscale = createColorSection('Neutral Grayscale', [
    createColorSwatch('--color-gray-55', 'Off-White'),
    createColorSwatch('--color-gray-100', 'Light Gray'),
    createColorSwatch('--color-gray-200', 'Border Gray'),
    createColorSwatch('--color-gray-300', 'Muted Gray'),
    createColorSwatch('--color-gray-400', 'Cool Slate'),
    createColorSwatch('--color-gray-500', 'Gray'),
    createColorSwatch('--color-gray-600', 'Body Muted'),
    createColorSwatch('--color-gray-700', 'Charcoal'),
    createColorSwatch('--color-gray-800', 'Dark Charcoal'),
    createColorSwatch('--color-gray-900', 'Almost Black'),
  ]).replace('--color-gray-55', '--color-gray-50'); // fix typo match

  const semanticColors = createColorSection('Special & Semantic Base', [
    createColorSwatch('--color-midnight-base', 'Midnight Body'),
    createColorSwatch('--color-yellow-500', 'WIP Yellow'),
  ]);

  container.innerHTML = `
    <h2 style="margin-bottom: 24px; font-family: var(--font-sans); color: var(--color-midnight-base);">Brand Color Tokens System</h2>
    ${primaryOrange}
    ${secondaryPurple}
    ${grayscale}
    ${semanticColors}
  `;

  return container;
};
