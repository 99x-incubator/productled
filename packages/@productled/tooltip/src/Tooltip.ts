import { BaseComponent, customElement, Theme } from "@productled/core";
import { TooltipConfig } from "./TooltipPlugin";
import { StylesElement } from "./StylesElement";

@customElement("productled-tooltip")
export class Tooltip extends BaseComponent {
    constructor(
        protected readonly targetElement: HTMLElement,
        protected readonly config: TooltipConfig,
        protected readonly theme: Theme) {
        super(targetElement, config, theme);
    }

    show() {
        this.targetElement.setAttribute("aria-describedBy", this.id);

        const tooltip = this.getTooltipEl();
        tooltip.classList.add("show");
    }

    hide(): void {
        const tooltip = this.getTooltipEl();
        tooltip.classList.remove("show");
        this.targetElement.removeAttribute("aria-describedBy");
    }

    protected render(): void {
        // TODO: Add aria-describedBy on the target element 
        // with a unique id for the tooltip
        const tooltipId = "tooltip-1";
        this.setAttribute("id", tooltipId);
    }

    protected getTemplate(): HTMLTemplateElement {
        const template = document.createElement("template");

        const tooltip = document.createElement("div");
        tooltip.classList.add("productled-tooltip", `productled-tooltip-${this.config.position}`);
        tooltip.setAttribute("role", "tooltip");

        const arrow = document.createElement("div");
        arrow.className = "arrow";

        const content = document.createElement("pre");
        content.className = "content";
        content.textContent = this.config.text;

        tooltip.appendChild(content);
        template.content.appendChild(tooltip);

        return template;
    }

    protected getStyleElement(): HTMLStyleElement {
        const styles = new StylesElement(this.theme);
        return styles.Element;
    }

    private getTooltipEl(): HTMLElement {
        return this.shadowRoot.querySelector(".productled-tooltip")!;
    }
}