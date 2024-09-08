import { Theme } from '@productled/core';
import { StylesElement } from './StylesElement';
export interface Positioning {
  left: string;
  top: string;
}
export interface SpotlightConf {
  title: String;
  description: String;
  link: String;
  positioning: Positioning;
}
export class Spotlight {
    private targetElement: Element;
    private theme: Theme;

    public static SELECTOR = 'productled-spotlight';
    public static PLUGIN_NAME = 'spotlight';

    constructor(targetElement: Element, theme: Theme) {
        this.targetElement = targetElement;
        this.theme = theme;
    }

    create(spotlightConf: SpotlightConf): void {
        // Position the spotlight relative to the target element
        (this.targetElement as HTMLElement).style.position = 'relative';

        const container = document.createElement('div');
        container.classList.add(Spotlight.SELECTOR);
        container.style.position = 'absolute';
        container.style.left = `${spotlightConf.positioning.left}px`;
        container.style.top = `${spotlightConf.positioning.top}px`;

        const styles = new StylesElement(this.theme);
        container.appendChild(styles.Element);
        this.targetElement.appendChild(container);

        const spotlight = document.createElement('span');
        spotlight.classList.add('beacon');
        container.appendChild(spotlight);
    }
}
