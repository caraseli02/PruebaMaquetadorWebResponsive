import { createIcon, type IconName } from "./Icon";

export type TabItem = {
  label: string;
  icon?: IconName;
};

export type TabsOptions = {
  items?: TabItem[];
  activeIndex?: number;
};

const setActiveTab = (tabs: HTMLButtonElement[], activeIndex: number): void => {
  tabs.forEach((tab, index) => {
    const selected = index === activeIndex;
    tab.classList.toggle("dux-tabs__tab--active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
};

export const createTabs = ({
  items = [
    { label: "Aventura", icon: "activity" },
    { label: "Aventura", icon: "activity" },
    { label: "Aventura", icon: "activity" },
  ],
  activeIndex = 2,
}: TabsOptions = {}): HTMLElement => {
  const list = document.createElement("div");
  list.className = "dux-tabs";
  list.role = "tablist";
  list.setAttribute("aria-label", "Categorias de viaje");

  const tabs = items.map((item, index) => {
    const tab = document.createElement("button");
    tab.className = "dux-tabs__tab";
    tab.type = "button";
    tab.role = "tab";
    tab.id = `dux-tab-${index}`;

    if (item.icon) {
      tab.append(createIcon({ name: item.icon, size: 20, color: "currentColor" }));
    }

    const label = document.createElement("span");
    label.textContent = item.label;
    tab.append(label);

    tab.addEventListener("click", () => setActiveTab(tabs, index));
    tab.addEventListener("keydown", (event) => {
      const current = tabs.indexOf(tab);
      const next = event.key === "ArrowRight" ? current + 1 : event.key === "ArrowLeft" ? current - 1 : current;

      if (next !== current) {
        event.preventDefault();
        const wrappedIndex = (next + tabs.length) % tabs.length;
        setActiveTab(tabs, wrappedIndex);
        tabs[wrappedIndex]?.focus();
      }
    });

    list.append(tab);
    return tab;
  });

  setActiveTab(tabs, activeIndex);
  return list;
};
