import { Theme } from '@productled/core';
import { StylesElement } from './StylesElement';

// Interface for positioning of the tooltip
export interface Positioning {
  left: string;
  top: string;
}

// Interface for tooltip configuration
export interface TooltipConf {
  title: string;
  description: string;
  link: string;
}

// Tooltip class
export class Tooltip {
  private element: Element;
  private theme: Theme;
  private tooltip: HTMLElement | null = null;

  // Constants
  public static SELECTOR = 'productled-tooltip';
  public static PLUGIN_NAME = 'tooltip';

  constructor(targetElement: Element, theme: Theme) {
    this.element = targetElement;
    this.theme = theme;
  }

  /**
   * Creates the tooltip based on the provided configuration.
   * @param conf - The tooltip configuration.
   */
  create(conf: TooltipConf): void {
    // Create tooltip container
    this.tooltip = document.createElement('div');
    this.tooltip.classList.add(Tooltip.SELECTOR);
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
    this.tooltip.classList.add(Tooltip.SELECTOR);

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
    this.element.addEventListener('mouseleave', () => {
      this.hideTooltipWithDelay(500);
    });

    // Keep tooltip visible when hovering over the tooltip
    this.tooltip.addEventListener('mouseenter', () => {
      this.positionTooltip();
      this.tooltip!.style.display = 'block';
    });

    // Hide tooltip when leaving the tooltip
    this.tooltip.addEventListener('mouseleave', () => {
      this.hideTooltipWithDelay(500);
    });
  }

  /**
   * Checks if the mouse is on the target element or the tooltip.
   * @returns True if the mouse is on the target element or the tooltip, false otherwise.
   */
  private isMouseOn(): boolean {
    // Find if mouse is on this.element or this.tooltip
    const isMouseOnElement = this.element.matches(':hover') || false;
    const isMouseOnTooltip = this.tooltip?.matches(':hover') || false;
    return isMouseOnElement || isMouseOnTooltip;
  }

  /**
   * Positions the tooltip relative to the target element.
   */
  private positionTooltip(): void {
    const rect = this.element.getBoundingClientRect();
    this.tooltip!.style.left = `${rect.left + window.scrollX}px`;
    this.tooltip!.style.top = `${rect.bottom + window.scrollY}px`;
  }

  /**
   * Hides the tooltip after a small delay to handle fast mouse movements.
   * @param delay - The delay in milliseconds.
   */
  private hideTooltipWithDelay(delay = 200): void {
    setTimeout(() => {
      if (this.tooltip && !this.isMouseOn()) {
        this.tooltip.style.display = 'none';
      }
    }, delay);
  }
}
