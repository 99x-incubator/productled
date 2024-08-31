import style from './styles';
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
    private title: String;
    private description:String;
    private link: String;
    private positioning: Positioning;

    constructor(targetElement: Element, title: String, description: String, link: String, positioning: Positioning) {
        this.targetElement = targetElement;
        this.positioning = positioning;
        this.title = title;
        this.description = description;
        this.link = link;
    }

    create(): void {
        // Position the spotlight relative to the target element
        (this.targetElement as HTMLElement).style.position = 'relative';

        const container = document.createElement('div');
        container.classList.add('productled-spotlight');
        container.style.position = 'absolute';
        container.style.left = `${this.positioning.left}px`;
        container.style.top = `${this.positioning.top}px`;
        container.appendChild(style);
        this.targetElement.appendChild(container);

        const spotlight = document.createElement('span');
        spotlight.classList.add('beacon');
        container.appendChild(spotlight);
    }
}
