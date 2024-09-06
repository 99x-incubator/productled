import { Theme, type Plugin } from "@productled/core";
import { Spotlight } from "./Spotlight";

class SpotlightsPlugin implements Plugin {
    private key: string = "spotlights";

    get Name(): string {
        return this.key;
    }
    create(element: HTMLElement, spotlightConf: any, theme: Theme): void {
        const { title, description, link, positioning } = spotlightConf;
        if (element) {
            const spotlight = new Spotlight(element, theme);
            spotlight.create(title, description, link, positioning);
        }
    }
    removeAll(): void {
        const spotlights = document.querySelectorAll('.productled-' + this.key);
        spotlights.forEach(spotlight => {
            spotlight.remove();
        });
    }
}

export default SpotlightsPlugin;