import { Hook, Theme, type Plugin } from "@productled/core";
import { Spotlight, SpotlightConf } from "./Spotlight";

class SpotlightPlugin implements Plugin {
    private key: string = Spotlight.PLUGIN_NAME;

    get Name(): string {
        return this.key;
    }

    initialize(hooks: Hook[], theme: Theme): void {
        for (const hook of hooks) {
            const target = document.querySelector(hook.trigger.selector) as HTMLElement;
            this.create(target, hook, theme);
        }
    }

    create(element: HTMLElement, hook: Hook, theme: Theme): void {
        const spotlightConf: SpotlightConf = hook.config;
        if (element) {
            const spotlight = new Spotlight(element, theme);
            spotlight.create(spotlightConf);
        }
    }
    removeAll(): void {
        const spotlights = document.querySelectorAll('.' + Spotlight.SELECTOR);
        spotlights.forEach(spotlight => {
            spotlight.remove();
        });
    }
}

export default SpotlightPlugin;