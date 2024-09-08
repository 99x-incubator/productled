import { Hook } from "./Hook";
import PluginStore from "../plugins/PluginStore";
import DocumentService from "../DocumentService";
import { Theme } from "../theme/ThemeManager";

class HookExecuter {
  private pluginStore: PluginStore;
  private documentService: DocumentService;
  private theme: Theme;

  constructor(pluginStore: PluginStore, documentService: DocumentService, theme: Theme) {
    this.pluginStore = pluginStore;
    this.documentService = documentService;
    this.theme = theme;
  }

  public async executeHooks(hooks: Hook[]) {
    const pluginHooks = hooks.reduce((acc, hook) => {
      (acc[hook.plugin] ??= []).push(hook);
      return acc;
    }, {} as Record<string, Hook[]>);

    for (const [pluginName, hooks] of Object.entries(pluginHooks)) {
      const plugin = this.pluginStore.getPlugin(pluginName);
      if (!plugin) {
        console.warn(`Plugin with name ${pluginName} not found`);
        return;
      }

      plugin.initialize(hooks, this.theme);
    }
  }
}

export default HookExecuter;
