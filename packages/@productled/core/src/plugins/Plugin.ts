import { Theme } from "../theme/ThemeManager";

interface Plugin {
    get Name(): string;
    initialize(conf: any, theme: Theme): void;
    removeAll(): void;
}

export default Plugin;