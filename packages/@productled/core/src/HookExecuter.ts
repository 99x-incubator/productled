import Hook from "./Hook";
import PluginStore from "./PluginStore";
import DocumentService from "./DocumentService";

class HookExecuter {
  private pluginStore: PluginStore;
  private documentService: DocumentService;

  constructor(pluginStore: PluginStore, documentService: DocumentService) {
    this.pluginStore = pluginStore;
    this.documentService = documentService;
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
      plugin.create(element, hook)
    };
  }
}

export default HookExecuter;
