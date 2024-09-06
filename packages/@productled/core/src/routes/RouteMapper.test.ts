import RouteMapper from './RouteMapper';

describe('RouteMapper', () => {
    let routeMapper: RouteMapper;

    beforeEach(() => {
        routeMapper = new RouteMapper();
    });

    describe("addRoute", () => {
        it('should add a static route', () => {
            const route = '/home';
            const key = routeMapper.addRoute(route);
            expect(key).toBeDefined();
        });

        it('should add a dynamic route with param', () => {
            const route = '/user/:id';
            const key = routeMapper.addRoute(route);
            expect(key).toBeDefined();
        });

        it('should add a dynamic route with wildcard', () => {
            const route = '/files/*';
            const key = routeMapper.addRoute(route);
            expect(key).toBeDefined();
        });

        it('should add a dynamic route with both param and wildcard', () => {
            const route = '/user/:id/files/*';
            const key = routeMapper.addRoute(route);
            expect(key).toBeDefined();
        });

        it('should not add duplicate static routes', () => {
            const route = '/home';
            const key1 = routeMapper.addRoute(route);
            const key2 = routeMapper.addRoute(route);
            expect(key1).toBe(key2);
        });

        it('should not add duplicate dynamic routes', () => {
            const route = '/user/:id';
            const key1 = routeMapper.addRoute(route);
            const key2 = routeMapper.addRoute(route);
            expect(key1).toBe(key2);
        });
    });

    describe("matchRoute", () => {
        const routeKeys: Record<string, Symbol> = {}

        beforeEach(() => {
            routeKeys['/home'] = routeMapper.addRoute('/home');
            routeKeys['/user/:id'] = routeMapper.addRoute('/user/:id');
            routeKeys['/files/*'] = routeMapper.addRoute('/files/*');
            routeKeys['/user/:id/files/*'] = routeMapper.addRoute('/user/:id/files/*');
        })

        it('should retrieve a static route', () => {
            expect(routeMapper.matchRoute('/home')).toBe(routeKeys['/home']);
        });

        it('should retrieve a dynamic route with param', () => {
            expect(routeMapper.matchRoute('/user/123')).toBe(routeKeys['/user/:id']);
        });

        it('should retrieve a dynamic route with wildcard', () => {
            expect(routeMapper.matchRoute('/files/any/path')).toBe(routeKeys['/files/*']);
        });

        it('should retrieve a dynamic route with both param and wildcard', () => {
            expect(routeMapper.matchRoute('/user/123/files/any/path')).toBe(routeKeys['/user/:id/files/*']);
        });

        it('should return null for unmatched routes', () => {
            expect(routeMapper.matchRoute('/about')).toBeNull();
            expect(routeMapper.matchRoute('/home/extra')).toBeNull();
            expect(routeMapper.matchRoute('/user')).toBeNull();
            expect(routeMapper.matchRoute('/user/')).toBeNull();
            expect(routeMapper.matchRoute('/user/123/extra')).toBeNull();
            expect(routeMapper.matchRoute('/files')).toBeNull();
            expect(routeMapper.matchRoute('/user/123/files')).toBeNull();
        });
    })

    describe("matchRoute (priority matching)", () => {
        it("should match static route before param route", () => {
            const staticRouteKey = routeMapper.addRoute('/home');
            routeMapper.addRoute('/user/:id');

            expect(routeMapper.matchRoute('/home')).toBe(staticRouteKey);
        });

        it('should match static route before param route (reversed order)', () => {
            routeMapper.addRoute('/user/:id');
            const staticRouteKey = routeMapper.addRoute('/home');

            expect(routeMapper.matchRoute('/home')).toBe(staticRouteKey);
        });

        it("should match param route before wildcard route", () => {
            const paramRouteKey = routeMapper.addRoute('/user/:id');
            routeMapper.addRoute('/user/*');

            expect(routeMapper.matchRoute('/user/123')).toBe(paramRouteKey);
        });

        it("should match param route before wildcard route (reversed order)", () => {
            routeMapper.addRoute('/user/*');
            const paramRouteKey = routeMapper.addRoute('/user/:id');

            expect(routeMapper.matchRoute('/user/123')).toBe(paramRouteKey);
        });

        it("should match param route before param + wildcard route", () => {
            const paramRouteKey = routeMapper.addRoute('/user/:id/:action');
            routeMapper.addRoute('/user/:id/*');

            expect(routeMapper.matchRoute('/user/123/stash')).toBe(paramRouteKey);
        });

        it("should match param route before param + wildcard route (reversed order)", () => {
            routeMapper.addRoute('/user/:id/*');
            const paramRouteKey = routeMapper.addRoute('/user/:id/:action');

            expect(routeMapper.matchRoute('/user/123/stash')).toBe(paramRouteKey);
        });

        it("should match param + wildcard route before wildcard route", () => {
            const paramWildcardRouteKey = routeMapper.addRoute('/user/:id/*');
            routeMapper.addRoute('/user/*');

            expect(routeMapper.matchRoute('/user/123/extra')).toBe(paramWildcardRouteKey);
        });

        it("should match param + wildcard route before wildcard route (reversed order)", () => {
            routeMapper.addRoute('/user/*');
            const paramWildcardRouteKey = routeMapper.addRoute('/user/:id/*');

            expect(routeMapper.matchRoute('/user/123/extra')).toBe(paramWildcardRouteKey);
        });
    });
});