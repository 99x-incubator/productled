import type { Hook } from "../hooks/Hook";
import type { Theme } from "../theme/ThemeManager";

interface Plugin {
    get Name(): string;
    initialize(hooks: Hook[], theme: Theme): void;
    removeAll(): void;
}

export { type Plugin }