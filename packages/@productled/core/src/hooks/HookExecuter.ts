import Hook from "./Hook";
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
    for (const hook of hooks) {

      const selector = hook.trigger.selector
      const element = this.documentService.querySelector(selector) as HTMLElement | null;
      if (!element) {
        console.warn(`Element with selector ${selector} not found`);
        return;
      }
      const plugin = this.pluginStore.getPlugin(hook.pluginName);
      if (!plugin) {
        console.warn(`Plugin with name ${hook.pluginName} not found`);
        return;
      }
      plugin.create(element, hook, this.theme)
    };
  }
}

export default HookExecuter;
