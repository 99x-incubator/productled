import { Hook } from './Hook';
import RouteMapper from "../routes/RouteMapper";

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

            hook.plugin = pluginName;
            hooks.push(hook);
        }
    }

    public getHooks(url: route): Hook[] {
        const keys = this.routeMapper.matchRoutes(url);

        const matchedHooks: Hook[] = [];
        for (const key of keys) {
            const hooks = this.hookMap.get(key);
            if (hooks) {
                matchedHooks.push(...hooks);
            }
        }

        // Remove duplicate hooks
        return Array.from(new Set(matchedHooks));
    }

}

export default HookStore;