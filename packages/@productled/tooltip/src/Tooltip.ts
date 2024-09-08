import { BaseComponent, customElement, Theme } from "@productled/core";
import { TooltipConfig } from "./TooltipPlugin";

@customElement("productled-tooltip")
export class Tooltip extends BaseComponent {
    constructor(
        protected readonly targetElement: HTMLElement,
        protected readonly config: TooltipConfig,
        protected readonly theme: Theme) {
        super(targetElement, config, theme);
    }

    show(target: HTMLElement) {
        const rect = target.getBoundingClientRect();
        const tooltipRect = this.getBoundingClientRect();

        let left, top;

        switch (this.config.position) {
            case "top":
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                top = rect.top - tooltipRect.height - 5;
                break;
            case "left":
                left = rect.left - tooltipRect.width - 5;
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                break;
            case "right":
                left = rect.right + 5;
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                break;
            default: // bottom
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                top = rect.bottom + 5;
        }

        // Adjust if tooltip would overflow viewport
        left = Math.max(0, Math.min(left, window.innerWidth - tooltipRect.width));
        top = Math.max(0, Math.min(top, window.innerHeight - tooltipRect.height));

        // this.style.left = `${left}px`;
        // this.style.top = `${top}px`;
        this.style.display = "block";
    }

    hide(): void {
        this.style.display = "none";
    }

    protected render(): void {
        const pre = this.shadowRoot.querySelector(".tooltip-content");
        pre!.textContent = this.config.text;

        // TODO: Add aria-describedBy on the target element 
        // with a unique id for the tooltip
        const tooltipId = "tooltip-1";
        this.shadowRoot.querySelector(".tooltip")!.id = tooltipId;
        this.targetElement.setAttribute("aria-describedBy", tooltipId);
    }

    protected getTemplate(): HTMLTemplateElement {
        const template = document.createElement("template");

        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.setAttribute("role", "tooltip");

        const content = document.createElement("pre");
        content.className = "tooltip-content";

        tooltip.appendChild(content);
        template.content.appendChild(tooltip);

        const style = document.createElement("style");
        style.textContent = `
            :host {
                position: relative;
                display: inline-block;
            }

.tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 4px;
  font-size: 0.875em;
  white-space: nowrap;
  z-index: 1;
  transition: opacity 0.3s, visibility 0.3s;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}
      `;
        template.content.appendChild(style);

        return template;
    }
}