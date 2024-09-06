import { Theme } from "../theme/ThemeManager";

interface Plugin {
    get Name(): string;
    create(element: HTMLElement, conf: any, theme: Theme): void;
    removeAll(): void;
}

export default Plugin;