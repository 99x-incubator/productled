type Hook = (element: HTMLElement | null) => void;

interface HookEntry {
  route: string;
  selector: string;
  hook: Hook;
}

class HookManager {
  private hooks: HookEntry[] = [];

  public registerHook(route: string, selector: string, hook: Hook) {
    this.hooks.push({ route, selector, hook });
  }

  public executeHooks(currentRoute: string) {
    this.hooks.forEach(({ route, selector, hook }) => {
      if (currentRoute === route) {
        const element = document.querySelector(selector) as HTMLElement | null;
        hook(element);
      }
    });
  }
}

export default HookManager;
