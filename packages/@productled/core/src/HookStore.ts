import Hook from './Hook';
import RouteMapper from "./RouteMapper";

type route = string;

class HookStore {
    private routeMapper: RouteMapper = new RouteMapper();
    private hookMap: Map<Symbol, Hook[]> = new Map();

    public addHooks(hooks: Hook[], pluginName: string) {
        for (const hook of hooks) {
            const key = this.routeMapper.addRoute(hook.trigger.url);
            let hooks = this.hookMap.get(key);
            if (!hooks) {
                hooks = [];
                this.hookMap.set(key, hooks);
            }

            hook.pluginName = pluginName;
            hooks.push(hook);
        }
    }

    public getHooks(url: route): Hook[] {
        const key = this.routeMapper.matchRoute(url);
        if (!key) {
            return [];
        }

        return this.hookMap.get(key) || [];
    }

}

export default HookStore;