import { Theme } from '@productled/core';
import { StylesElement } from './StylesElement';

export interface Positioning {
  left: string;
  top: string;
}

export interface TooltipConf {
  title: string;
  description: string;
  link: string;
  positioning: Positioning;
}

export class Tooltip {
  private element: Element;
  private theme: Theme;
  private tooltip: HTMLElement | null = null;

  public static SELECTOR = 'productled-tooltip';
  public static PLUGIN_NAME = 'tooltip';

  constructor(targetElement: Element, theme: Theme) {
    this.element = targetElement;
    this.theme = theme;
  }

  create(conf: TooltipConf): void {

    // Create tooltip container
    this.tooltip = document.createElement('div');
    this.tooltip.style.position = 'absolute';
    this.tooltip.style.backgroundColor = this.theme.backgroundColor;
    this.tooltip.style.color = this.theme.textColor;
    this.tooltip.style.border = `1px solid ${this.theme.primaryColor}`;
    this.tooltip.style.padding = '10px';
    this.tooltip.style.fontSize = this.theme.fontSize;
    this.tooltip.style.zIndex = '1000';
    this.tooltip.style.display = 'none'; // Initially hidden

    // Create styles element
    const styles = new StylesElement(this.theme);
    this.tooltip.appendChild(styles.Element);

    // Add class for the tooltip
    this.tooltip.classList.add('productled-tooltip');

    // Create title
    const title = document.createElement('h3');
    title.innerText = conf.title;
    title.style.color = this.theme.primaryColor;
    this.tooltip.appendChild(title);

    // Create description
    const description = document.createElement('p');
    description.innerText = conf.description;
    this.tooltip.appendChild(description);

    // Create link
    const link = document.createElement('a');
    link.href = conf.link;
    link.innerText = 'Learn more';
    link.style.color = this.theme.secondaryColor;
    link.target = '_blank';
    this.tooltip.appendChild(link);

    // Append the tooltip to the body
    document.body.appendChild(this.tooltip);

    // Show tooltip on hover of target element
    this.element.addEventListener('mouseenter', () => {
      this.positionTooltip();
      this.tooltip!.style.display = 'block';
    });

    // Hide tooltip when leaving both the element and the tooltip
    this.element.addEventListener('mouseleave', (e) => {
      this.element.addEventListener('mouseleave', (e) => {
        const isMouseOnTooltip = (e as MouseEvent).relatedTarget === this.tooltip;
        if (!isMouseOnTooltip) {
          this.hideTooltipWithDelay(500);
        }
      });
    });

    // Keep tooltip visible when hovering over the tooltip
    this.tooltip.addEventListener('mouseenter', () => {
      this.positionTooltip();
      this.tooltip!.style.display = 'block';
    });

    // Hide tooltip when leaving the tooltip
    this.tooltip.addEventListener('mouseleave', (e) => {
      const isMouseOnElement = (e as MouseEvent).relatedTarget === this.element;
      if (!isMouseOnElement) {
        this.hideTooltipWithDelay();
      }
    });
  }

  private positionTooltip() {

    const rect = this.element.getBoundingClientRect();
    this.tooltip!.style.left = `${rect.left + window.scrollX}px`;
    this.tooltip!.style.top = `${rect.bottom + window.scrollY}px`;
  };

  // Hide tooltip after a small delay to handle fast mouse movements
  private hideTooltipWithDelay(delay = 200) {
    setTimeout(() => {
      if (this.tooltip) {
        this.tooltip.style.display = 'none';
      }
    }, delay); // 200ms delay to avoid flicker during fast mouse transitions
  }
}
