import { type Plugin } from "@productled/core";
import { Spotlight } from "./Spotlight";

class SpotlightPlugin implements Plugin {
    private key: string = "spotlights";

    get Name(): string {
        return this.key;
    }
    create(element: HTMLElement, spotlightConf: any): void {
        const { title, description, link, positioning } = spotlightConf;
        if (element) {
            const spotlight = new Spotlight(element, title, description, link, positioning);
            spotlight.create();
        }
    }
    removeAll(): void {
        const spotlights = document.querySelectorAll('.productled-' + this.key);
        spotlights.forEach(spotlight => {
            spotlight.remove();
        });
    }
}

export default SpotlightPlugin;