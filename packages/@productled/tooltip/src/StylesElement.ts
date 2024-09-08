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
      position: absolute;
      background-color: var(--backgroundColor);
      color: var(--textColor);
      padding: 10px;
      border-radius: 4px;
      border: 1px solid var(--primaryColor);
      z-index: 1000;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      display: none;
      margin-top: 10px;
    }

    .productled-tooltip::before {
      content: '';
      position: absolute;
      bottom: 100%; /* Place the arrow at the top edge */
      left: 10px;
      transform: translateX(-50%);
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent var(--primaryColor) transparent;
    }
`;
  }
}

export { StylesElement };