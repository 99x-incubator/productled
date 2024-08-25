import RouteListener from './RouteListener';
import HookManager from './HookManager';

class Productled {
  private static instance: Productled;
  private routeListener: RouteListener;
  private hookManager: HookManager;

  private constructor() {
    this.routeListener = new RouteListener();
    this.hookManager = new HookManager();

    this.routeListener.addListener(this.onRouteChange.bind(this));
  }

  public static getInstance(): Productled {
    if (!Productled.instance) {
      Productled.instance = new Productled();
    }
    return Productled.instance;
  }

  private onRouteChange() {
    const currentRoute = window.location.pathname;
    this.hookManager.executeHooks(currentRoute);
  }

  public registerHook(route: string, selector: string, hook: (element: HTMLElement | null) => void) {
    this.hookManager.registerHook(route, selector, hook);
  }

  public routeChanged() {
    this.routeListener.notifyListeners();
  }
}

export default Productled;
