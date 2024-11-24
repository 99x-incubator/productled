import type { Hook } from "./Hook";
import PluginStore from "../plugins/PluginStore";
import type { Theme } from "../theme/ThemeManager";

class HookExecuter {
  constructor(
    private readonly pluginStore: PluginStore, 
    private readonly theme: Theme
  ) { }

  public async executeHooks(hooks: Hook[]) {
    const pluginHooks = Object.groupBy(hooks, ({ plugin }) => plugin);

    for (const [pluginName, hooks] of Object.entries(pluginHooks)) {
      const plugin = this.pluginStore.getPlugin(pluginName);
      if (!plugin) {
        console.warn(`Plugin with name ${pluginName} not found`);
        return;
      }

      plugin.initialize(hooks!, this.theme);
    }
  }
}

export default HookExecuter;
