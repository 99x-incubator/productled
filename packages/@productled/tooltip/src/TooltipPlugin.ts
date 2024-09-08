import { Hook, type Plugin, Theme } from "@productled/core";
import { Tooltip } from "./Tooltip";

export type Position = "top" | "bottom" | "left" | "right";

export interface TooltipConfig {
    selector: string;
    text: string;
    position?: Position;
}

class TooltipPlugin implements Plugin {
    private readonly key: string = "tooltip";
    private tooltips: Map<string, Tooltip> = new Map<string, Tooltip>();
    private hooks!: Hook[];
    private theme!: Theme;
    private mutationObserver!: MutationObserver;

    constructor() {
        this.mutationObserver = new MutationObserver(this.handleDomMutations);
    }

    get Name(): string {
        return this.key;
    }

    initialize(hooks: Hook[], theme: Theme) {
        this.hooks = hooks;
        this.theme = theme;
        this.attachEventListeners();
        this.observeDomMutations();
    }

    removeAll(): void {

    }

    private attachEventListeners(): void {
        document.body.addEventListener("mouseover", this.handleMouseOver);
        document.body.addEventListener("mouseout", this.handleMouseOut);
        window.addEventListener("resize", this.updateTooltipPositions);
        window.addEventListener("scroll", this.updateTooltipPositions);
    }

    private handleMouseOver = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        const hook = this.findTooltipConfig(target);
        if (!hook) {
            return;
        }

        this.initializeTooltip(hook, target);
    }

    private handleMouseOut = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const hook = this.findTooltipConfig(target);

        if (hook) {
            const tooltip = this.tooltips.get(hook.trigger.selector);
            if (tooltip) {
                tooltip.hide();
            }
        }
    }

    private initializeTooltip(hook: Hook, target: HTMLElement) {
        const tooltip = this.tooltips.get(hook.trigger.selector);
        if (tooltip) {
            tooltip.show(target);
        } else {
            const newTooltip = new Tooltip(target, hook.config, this.theme);
            this.tooltips.set(hook.trigger.selector, newTooltip);
            target.appendChild(newTooltip);
        }

    }

    private observeDomMutations() {
        this.mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    private handleDomMutations = (mutations: MutationRecord[]) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node instanceof HTMLElement) {
                    this.hooks.forEach(hook => {
                        const selector = hook.config.selector;
                        if (node.matches(selector) || node.querySelector(selector)) {
                            this.initializeTooltip(hook, node);
                        }
                    });
                }
            });
        });
    }

    private updateTooltipPositions = () => {
        this.tooltips.forEach((tooltip, selector) => {
            if (tooltip.style.display !== 'none') {
                const target = document.querySelector(selector) as HTMLElement;
                if (target) {
                    const hook = this.findTooltipConfig(target);
                    if (hook) {
                        tooltip.show(target);
                    }
                }
            }
        });
    }

    private findTooltipConfig(element: HTMLElement): Hook | undefined {
        return this.hooks.find(h => element.matches(h.trigger.selector));
    }
}

export default TooltipPlugin;