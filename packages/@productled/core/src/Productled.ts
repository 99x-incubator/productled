import HookExecuter from './HookExecuter';
import HookStore from './HookStore';
import Plugin from './Plugin';
import ConfigStore from './ConfigStore';
import PluginStore from './PluginStore';
import DocumentService from './DocumentService';
import { RouteListener } from "./RouteListener";

/**
 * The Productled class represents the core functionality of the Productled library.
 * It provides methods for registering hooks, handling route changes, and retrieving configuration.
 */
class Productled {
  private static instance: Productled;
  protected hookStore: HookStore;
  protected configStore: ConfigStore;
  protected pluginStore: PluginStore;
  protected documentService: DocumentService;
  protected routeListener: RouteListener;

  /**
   * The constructor is private to ensure that the class is a singleton.
   * @param {any} config - The configuration object
   */
  private constructor() {
    this.hookStore = new HookStore();
    this.pluginStore = new PluginStore();
    this.documentService = new DocumentService();
    this.configStore = new ConfigStore();
    this.routeListener = new RouteListener();
    this.routeListener.addListener(this.routeChanged.bind(this));
  }

  /**
   * This method returns the singleton instance of the Productled class.
   * @param {any} config - The configuration object
   * @returns {Productled} - The Productled instance
   */
  public static getInstance(): Productled {
    if (!Productled.instance) {
      Productled.instance = new Productled();
    }
    return Productled.instance;
  }

  /**
   * This method registers the hook configuration with the Productled instance.
   */
  public loadConfig(config: any) {
    this.configStore.Configuration = config;
  }

  /**
   * This method is called when the route changes. 
   * It retrieves the hooks for the current route and executes them.
   * @param {string} url - The URL of the new route
   * @returns {Promise<void>}
   */
  private routeChanged(url: string) {
    const hooks = this.hookStore.getHooks(url);

    const hookExecuter = new HookExecuter(this.pluginStore, this.documentService);
    hookExecuter.executeHooks(hooks);
  }

  /**
   * This method is called when a plugin is registered. 
   * It adds the plugin to the plugin store and retrieves the hooks for the plugin.
   * @param {Plugin} plugin - The plugin to register
   * @returns {void}
   */
  public registerPlugin(plugin: Plugin) {
    const pluginName = plugin.Name;
    // Add the plugin to the plugin store
    this.pluginStore.addPlugin(plugin);
    // Get the hooks for the plugin and add them to the hook store
    const hooks = this.configStore.getHooks(pluginName);
    this.hookStore.addHooks(hooks, pluginName);
  }

}

export default Productled;
