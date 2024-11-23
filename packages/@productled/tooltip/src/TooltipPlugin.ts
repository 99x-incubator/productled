import type { Hook, Theme, Plugin } from "@productled/core";
import { Tooltip, type TooltipConf } from "./Tooltip";

class TooltipPlugin implements Plugin {
    private key: string = Tooltip.PLUGIN_NAME;

    get Name(): string {
        return this.key;
    }

    initialize(hooks: Hook[], theme: Theme): void {
        for (const hook of hooks) {
            const conf: TooltipConf = hook.config;
            const element = document.querySelector(hook.trigger.selector) as HTMLElement;
            if (element) {
                const tooltip = new Tooltip(element, theme);
                tooltip.create(conf);
            }
        }
    }
    
    removeAll(): void {
        const elements = document.querySelectorAll('.' + Tooltip.SELECTOR);
        elements.forEach(element => {
            element.remove();
        });
    }
}

export default TooltipPlugin;