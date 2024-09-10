import { Hook } from './Hook';
import RouteMapper from "../routes/RouteMapper";

type route = string;

class HookStore {
    private routeMapper: RouteMapper = new RouteMapper();
    private hookMap: Map<Symbol, Hook[]> = new Map();

    public addHooks(hooks: Hook[], pluginName: string) {
        for (const hook of hooks) {
            hook.plugin = pluginName;
            const urls: string[] = Array.isArray(hook.trigger.url) ? hook.trigger.url : [hook.trigger.url];

            // Register the hook for each URL provided in the trigger
            for (const url of urls) {
                const key = this.routeMapper.addRoute(url);
                const hooks = this.hookMap.get(key) ?? [];
                hooks.push(hook);
                this.hookMap.set(key, hooks);
            }
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