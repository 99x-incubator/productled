type pluginName = string;

interface Plugin {
    get Name(): pluginName;
    create(element: HTMLElement, conf: any): void;
    removeAll(): void;
}

export default Plugin;