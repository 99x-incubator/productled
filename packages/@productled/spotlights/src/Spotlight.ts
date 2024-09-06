import { Theme } from '@productled/core';
import { StylesElement } from './StylesElement';

export interface Positioning {
  alignment: string;
  left: string;
  top: string;
}
export interface SpotlightConf {
  title: String;
  description: String;
  link: String;
  frequency: string;
  positioning: Positioning;
}
export class Spotlight {
    private targetElement: Element;
    private theme: Theme;

    constructor(targetElement: Element, theme: Theme) {
        this.targetElement = targetElement;
        this.theme = theme;
    }

    create(title: String, description: String, link: String, positioning: Positioning): void {
        // Position the spotlight relative to the target element
        (this.targetElement as HTMLElement).style.position = 'relative';

        const container = document.createElement('div');
        container.classList.add('productled-spotlight');
        container.style.position = 'absolute';
        container.style.left = `${positioning.left}px`;
        container.style.top = `${positioning.top}px`;

        const styles = new StylesElement(this.theme);
        container.appendChild(styles.Element);
        this.targetElement.appendChild(container);

        const spotlight = document.createElement('span');
        spotlight.classList.add('beacon');
        container.appendChild(spotlight);
    }
}
