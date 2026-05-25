import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';
import badgeWip from '../../assets/badge-wip.svg';

export default {
  title: 'Brand/Logos',
  parameters: {
    layout: 'centered',
  },
};

export const LightLogo = () => {
  const container = document.createElement('div');
  container.style.padding = '40px';
  container.style.backgroundColor = '#FFFFFF';
  container.style.borderRadius = 'var(--radius-md)';
  container.style.border = '1px solid var(--color-border)';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.gap = '16px';
  container.style.fontFamily = 'var(--font-sans)';

  container.innerHTML = `
    <h4 style="margin-bottom: 8px; color: var(--color-text-main);">Waveless Logo (Light Theme)</h4>
    <div style="padding: 16px;">
      <img src="${logoLight}" alt="Waveless Logo Light" style="height: 48px; display: block;" />
    </div>
    <span style="font-size: var(--font-size-2xs); color: var(--color-text-muted);">Used on white, off-white, and light gray surfaces.</span>
  `;
  return container;
};

export const DarkLogo = () => {
  const container = document.createElement('div');
  container.style.padding = '40px';
  container.style.backgroundColor = 'var(--color-purple-900)';
  container.style.borderRadius = 'var(--radius-md)';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.gap = '16px';
  container.style.fontFamily = 'var(--font-sans)';

  container.innerHTML = `
    <h4 style="margin-bottom: 8px; color: var(--color-text-light);">Waveless Logo (Dark Theme)</h4>
    <div style="padding: 16px;">
      <img src="${logoDark}" alt="Waveless Logo Dark" style="height: 48px; display: block;" />
    </div>
    <span style="font-size: var(--font-size-2xs); color: var(--color-purple-200);">Used on dark purple, dark gray, or midnight base surfaces.</span>
  `;
  return container;
};

export const WIPBadge = () => {
  const container = document.createElement('div');
  container.style.padding = '40px';
  container.style.backgroundColor = 'var(--color-bg-main)';
  container.style.borderRadius = 'var(--radius-md)';
  container.style.border = '1px solid var(--color-border)';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.gap = '16px';
  container.style.fontFamily = 'var(--font-sans)';

  container.innerHTML = `
    <h4 style="margin-bottom: 8px; color: var(--color-text-main);">WIP Badge</h4>
    <div style="padding: 8px;">
      <img src="${badgeWip}" alt="WIP Badge" style="height: 40px; display: block;" />
    </div>
    <span style="font-size: var(--font-size-2xs); color: var(--color-text-muted);">Used to represent Work In Progress states.</span>
  `;
  return container;
};
