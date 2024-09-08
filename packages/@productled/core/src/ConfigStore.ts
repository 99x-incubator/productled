import { Config, Hook } from "./hooks/Hook";

class ConfigStore {
    private pluginDict: { [plugin: string]: Hook[] } = {};


    public load(config: Config) {
        this.addToPluginDictionary(config);
    }

    public getHooks(pluginName: string): any {
        return this.pluginDict[pluginName] || [];
    }

    private addToPluginDictionary(hooksConfig: Config): { [plugin: string]: Hook[] } {
      
        hooksConfig.hooks.forEach(hook => {
          if (!this.pluginDict[hook.plugin]) {
            this.pluginDict[hook.plugin] = [];
          }
          this.pluginDict[hook.plugin].push(hook);
        });
      
        return this.pluginDict;
      }
      

}

export default ConfigStore;