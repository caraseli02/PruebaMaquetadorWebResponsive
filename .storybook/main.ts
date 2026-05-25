import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|js|mdx)"],
  addons: ["@storybook/addon-a11y"],
  framework: {
    name: "@storybook/html-vite",
    options: {}
  }
};

export default config;
