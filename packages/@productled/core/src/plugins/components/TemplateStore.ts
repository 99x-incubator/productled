export interface ITemplateStore {
    get(key: string, cacheMissCreate: () => HTMLTemplateElement): HTMLTemplateElement;
}

class TemplateStore implements ITemplateStore {
    private readonly templates: Map<string, HTMLTemplateElement> =
        new Map<string, HTMLTemplateElement>();

    get(key: string, cacheMissCreate: () => HTMLTemplateElement): HTMLTemplateElement {
        let template = this.templates.get(key);
        if (!template) {
            template = cacheMissCreate();
        }

        return template!;
    }
}

export const templateStore: ITemplateStore = new TemplateStore();