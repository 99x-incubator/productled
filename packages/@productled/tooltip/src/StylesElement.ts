import { Theme } from "@productled/core";

class StylesElement {
  private color: string;

  constructor(theme: Theme) {
    this.color = theme.primaryColor;
  }

  public get Element(): HTMLStyleElement {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = this.CssCode;
    return styleElement;
  }

  get CssCode(): string {
    return `
    .productled-tooltip {
      --tooltip-max-width: 200px;
      --tooltip-color: var(--primaryColor);
      --tooltip-border-radius: .25rem;
      --tooltip-bg: #000;
      --tooltip-font-size: 1rem * .875;
      --tooltip-opacity: .9;
      --tooltip-padding-y: 1rem * .25;
      --tooltip-padding-x: 1rem * .5;
      --tooltip-margin: 0;
      --tooltip-zindex: 1080;

      --tooltip-arrow-width: .8rem;
      --tooltip-arrow-height: .4rem;

      position: absolute;
      z-index: var(--tooltip-zindex);
      margin: var(--tooltip-margin);
      word-wrap: break-word;
      opacity: 0;
    }

    .productled-tooltip.show { 
      display: block;
      opacity: var(--tooltip-opacity); 
    }

    .productled-tooltip.arrow {
      display: block;
      width: var(--tooltip-arrow-width);
      height: var(--tooltip-arrow-height);
    }

    .productled-tooltip::before {
      position: absolute;
      content: '';
      border-color: transparent;
      border-style: solid;
    }

    .productled-tooltip-hover-link {
      color: var(--secondaryColor); /* Use CSS variable or define the color directly */
    }

    .productled-tooltip-hover-link:hover {
      color: var(--primaryColor); /* Use CSS variable or define the hover color directly */
    }

    .productled-tooltip.content {
      max-width: var(--tooltip-max-width);
      padding: var(--tooltip-padding-y) var(--tooltip-padding-x);
      color: var(--tooltip-color);
      text-align: center;
      background-color: var(--tooltip-bg);
      border-radius: var(--tooltip-border-radius);
    }

    .productled-tooltip-top {
      padding: var(--tooltip-arrow-height) 0;
    }

    .productled-tooltip-top.arrow {
      bottom: 0;
    }

    .productled-tooltip-top.arrow::before {
      top: 0;
      border-width: var(--tooltip-arrow-height) (var(--tooltip-arrow-width) / 2) 0;
      border-top-color: var(--tooltip-arrow-color);
    }

    .productled-tooltip-right {
      padding: 0 var(--tooltip-arrow-height);
    }

    .productled-tooltip-right.arrow {
      left: 0;
      width: var(--tooltip-arrow-height);
      height: var(--tooltip-arrow-width);
    }

    .productled-tooltip-right.arrow::before {
      right: 0;
      border-width: (var(--tooltip-arrow-width) / 2) var(--tooltip-arrow-height) (var(--tooltip-arrow-width) / 2) 0;
      border-right-color: var(--tooltip-arrow-color);
    }

    .productled-tooltip-bottom {
      padding: var(--tooltip-arrow-height) 0;
    }

    .productled-tooltip-bottom.arrow {
      top: 0;
    }

    .productled-tooltip-bottom.arrow::before {
      bottom: 0;
      border-width: 0 (var(--tooltip-arrow-width) / 2) var(--tooltip-arrow-height);
      border-bottom-color: var(--tooltip-arrow-color);
    }

    .productled-tooltip-left {
      padding: 0 var(--tooltip-arrow-height);
    }

    .productled-tooltip-left.arrow {
      right: 0;
      width: var(--tooltip-arrow-height);
      height: var(--tooltip-arrow-width);
    }

    .productled-tooltip-left.arrow::before {
      left: 0;
      border-width: (var(--tooltip-arrow-width) / 2) 0 (var(--tooltip-arrow-width) / 2) var(--tooltip-arrow-height);
      border-left-color: var(--tooltip-arrow-color);
    }
`;
  }
}

export { StylesElement };