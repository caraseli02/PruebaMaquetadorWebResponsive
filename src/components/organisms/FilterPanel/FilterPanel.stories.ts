import type { Meta, StoryObj } from "@storybook/html";
import { FilterPanel } from "./FilterPanel";
import type { FilterPanelProps } from "./FilterPanel";

const meta: Meta<FilterPanelProps> = {
  title: "Organisms/FilterPanel",
  render: (args) => {
    if (args.dialogMode) {
      // For dialog mode, we render a trigger button to open it
      const container = document.createElement("div");
      container.style.padding = "var(--space-md)";
      container.style.backgroundColor = "var(--color-bg-main)";
      container.style.fontFamily = "var(--font-sans)";
      
      const info = document.createElement("p");
      info.textContent = "Haz clic en el botón para simular la apertura del panel en móvil utilizando la etiqueta nativa <dialog>:";
      info.style.marginBottom = "var(--space-md)";
      container.appendChild(info);
      
      const dialog = FilterPanel(args) as HTMLDialogElement;
      container.appendChild(dialog);
      
      const openBtn = document.createElement("button");
      openBtn.className = "btn btn--primary";
      openBtn.textContent = "Abrir Panel de Filtros";
      openBtn.addEventListener("click", () => {
        dialog.showModal();
        document.body.classList.add("no-scroll");
      });
      container.appendChild(openBtn);
      
      return container;
    }
    
    // Default inline mode
    const sidebar = document.createElement("div");
    sidebar.style.width = "320px";
    sidebar.style.padding = "var(--space-md)";
    sidebar.style.backgroundColor = "var(--color-bg-main)";
    sidebar.appendChild(FilterPanel(args));
    return sidebar;
  },
  argTypes: {
    dialogMode: { control: "boolean" },
    onFilterChange: { action: "filter-state-changed" },
  },
};

export default meta;
type Story = StoryObj<FilterPanelProps>;

export const SidebarInline: Story = {
  args: {
    dialogMode: false,
  },
};

export const MobileModalDialog: Story = {
  args: {
    dialogMode: true,
  },
};
