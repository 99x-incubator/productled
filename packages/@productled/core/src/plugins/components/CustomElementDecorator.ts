export const customElement = (name: string) => (target: any) => {
    window.customElements.define(name, target);
}