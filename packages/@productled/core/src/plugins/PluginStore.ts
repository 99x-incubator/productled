import Plugin from './Plugin';

type pluginName = string;

class PluginStore {

    private definitionDictionary: Record<pluginName, Plugin> = {};

    public addPlugin(plugin: Plugin) {
        if (!this.definitionDictionary[plugin.Name]) {
            this.definitionDictionary[plugin.Name] = plugin;
        } else {
            console.warn(`Plugin with name ${plugin.Name} already exists`);
        }
    }

    public getPlugin(pluginName: pluginName): Plugin {
        return this.definitionDictionary[pluginName];
    }

    public clearPluginElements() {
        // iterate over all the plugins and remove all the elements
        Object.keys(this.definitionDictionary).forEach(key => {
            this.definitionDictionary[key].removeAll();
        });
    }

}

export default PluginStore;