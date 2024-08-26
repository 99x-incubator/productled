
interface Plugin {
    get Name(): string;
    create(element: HTMLElement, conf: any): void;
    removeAll(): void;
}

export default Plugin;