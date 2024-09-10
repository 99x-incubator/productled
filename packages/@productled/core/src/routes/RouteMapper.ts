enum RouteType {
    Static = 0,
    Param = 1 << 0,
    Wildcard = 1 << 1,
}

interface DynamicRoute {
    key: Symbol;
    type: RouteType;
    regexp: RegExp;
}

class RouteMapper {
    private staticRoutes: Record<string, Symbol> = {};
    private dynamicRoutes: Record<string, DynamicRoute> = {};

    public addRoute(route: string): Symbol {
        const key = Symbol();

        // TODO: Add route validations (eg: Wildcard [*] should be the last part of the route, etc)

        const routeType = this.findRouteType(route);
        if (routeType === RouteType.Static) {
            if (this.staticRoutes[route]) {
                return this.staticRoutes[route];
            }

            this.staticRoutes[route] = key;
            return key
        }

        const regexp = this.generateRegex(route);
        if (this.dynamicRoutes[regexp.source]) {
            return this.dynamicRoutes[regexp.source].key;
        }

        this.dynamicRoutes[regexp.source] = {
            key: key,
            type: routeType,
            regexp: regexp,
        };

        this.reorderDynamicRoutes();
        return key;
    }

    private findRouteType(route: string): RouteType {
        let routeType = RouteType.Static;

        if (route.includes(':')) {
            routeType |= RouteType.Param;
        }

        if (route.includes('*')) {
            routeType |= RouteType.Wildcard;
        }

        return routeType;
    }

    private generateRegex(route: string): RegExp {
        // Escape special regex characters in the route
        let escapedRoute = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Replace param placeholders like :id with a regex pattern that matches any non-slash characters
        escapedRoute = escapedRoute.replace(/:([^/]+)/g, '([^/]+)');

        // If the route ends with a wildcard `*`, replace it with a regex pattern to match any characters
        if (escapedRoute.endsWith('\\*')) {
            escapedRoute = escapedRoute.slice(0, -2) + '(.*)';
        }

        // Add start (^) and end ($) anchors for strict matching
        const fullRegexPattern = `^${escapedRoute}$`;
        return new RegExp(fullRegexPattern);
    }

    private reorderDynamicRoutes(): void {
        const sortedEntries = Object.entries(this.dynamicRoutes).sort((a, b) => {
            const typeOrder = (type: RouteType) => {
                if (type === RouteType.Param) return 1;
                if (type === (RouteType.Param | RouteType.Wildcard)) return 2;
                if (type === RouteType.Wildcard) return 3;
                return 4;
            };

            return typeOrder(a[1].type) - typeOrder(b[1].type);
        });

        this.dynamicRoutes = Object.fromEntries(sortedEntries);
    }

    public matchRoutes(route: string): Symbol[] {
        const matched: Symbol[] = [];

        if (this.staticRoutes[route]) {
            matched.push(this.staticRoutes[route]);
        }

        for (const dynamicRoute of Object.values(this.dynamicRoutes)) {
            if (dynamicRoute.regexp.test(route)) {
                matched.push(dynamicRoute.key);
            }
        }

        return matched;
    }
}

export default RouteMapper;