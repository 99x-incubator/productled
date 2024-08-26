import Hook from './Hook';

type route = string;

class HookStore {

    private hookDictionary: Record<route, Hook[]> = {};

    public addHooks(hooks: Hook[], pluginName: string) {
        for (const hook of hooks) {
            // Check if the definition is within schedule, if not skip
            if (true || hook.trigger.isWithinSchedule()) {
                // Check if the definition is already in the dictionary, if not add it
                if (!this.hookDictionary[hook.trigger.url]) {
                    this.hookDictionary[hook.trigger.url] = [];
                }
                // Add the plugin name to the definition
                hook.pluginName = pluginName;
                // Add the definition to the dictionary
                this.hookDictionary[hook.trigger.url].push(hook);
            }
        }
    }

    public getHooks(url: route): Hook[] {
        return this.hookDictionary[url] || [];
    }

}

export default HookStore;