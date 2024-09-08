import { Theme } from "../../theme/ThemeManager";
import { templateStore } from "./TemplateStore";

export abstract class BaseComponent extends HTMLElement {
    // Ensures sub-classes see shadowRoot as non-nullable
    public readonly shadowRoot: ShadowRoot;

    constructor(
        protected readonly targetElement: HTMLElement,
        protected readonly config: any,
        protected readonly theme: Theme
    ) {
        super();

        const template = templateStore.get(
            this.constructor.name,
            this.getTemplate.bind(this));

        this.shadowRoot = this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }

    protected abstract getTemplate(): HTMLTemplateElement;
    protected abstract render(): void;
}