import { Theme } from '@productled/core';
import { StylesElement } from './StylesElement';
import { Tooltip } from '@productled/tooltip';
export interface Positioning {
  left: string;
  top: string;
}
export interface SpotlightConf {
  title: string;
  description: string;
  link: string;
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

  create(conf: SpotlightConf): void {
    // Position the spotlight relative to the target element
    (this.targetElement as HTMLElement).style.position = 'relative';

    const container = document.createElement('div');
    container.classList.add(Spotlight.SELECTOR);
    container.style.position = 'absolute';
    container.style.left = `${conf.positioning.left}px`;
    container.style.top = `${conf.positioning.top}px`;

    const styles = new StylesElement(this.theme);
    container.appendChild(styles.Element);
    this.targetElement.appendChild(container);

    const spotlight = document.createElement('span');
    spotlight.classList.add('beacon');
    container.appendChild(spotlight);

    // const tooltip = new Tooltip(spotlight, this.theme);
    // tooltip.create({
    //     title: conf.title,
    //     description: conf.description,
    //     link: conf.link,
    // });
  }
}
