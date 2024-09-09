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
            expect(routeMapper.matchRoutes('/home')).toEqual([routeKeys['/home']]);
        });

        it('should retrieve a dynamic route with param', () => {
            expect(routeMapper.matchRoutes('/user/123')).toEqual([routeKeys['/user/:id']]);
        });

        it('should retrieve a dynamic route with wildcard', () => {
            expect(routeMapper.matchRoutes('/files/any/path')).toEqual([routeKeys['/files/*']]);
        });

        it('should retrieve a dynamic route with both param and wildcard', () => {
            expect(routeMapper.matchRoutes('/user/123/files/any/path')).toEqual([routeKeys['/user/:id/files/*']]);
        });

        it('should return multiple keys for routes that match multiple patterns', () => {
            const paramRouteKey = routeMapper.addRoute('/user/:id');
            const wildcardRouteKey = routeMapper.addRoute('/user/*');
            const paramWildcardRouteKey = routeMapper.addRoute('/user/:id/*');

            expect(routeMapper.matchRoutes('/user/123')).toEqual([paramRouteKey, wildcardRouteKey]);
            expect(routeMapper.matchRoutes('/user/123/extra')).toEqual([paramWildcardRouteKey, wildcardRouteKey]);
        });


        it('should return null for unmatched routes', () => {
            expect(routeMapper.matchRoutes('/about')).toEqual([]);
            expect(routeMapper.matchRoutes('/home/extra')).toEqual([]);
            expect(routeMapper.matchRoutes('/user')).toEqual([]);
            expect(routeMapper.matchRoutes('/user/')).toEqual([]);
            expect(routeMapper.matchRoutes('/user/123/extra')).toEqual([]);
            expect(routeMapper.matchRoutes('/files')).toEqual([]);
            expect(routeMapper.matchRoutes('/user/123/files')).toEqual([]);
        });
    })

    describe("matchRoute (priority matching)", () => {
        it("should match static route before param route", () => {
            const staticRouteKey = routeMapper.addRoute('/user/101');
            const paramRouteKey = routeMapper.addRoute('/user/:id');

            expect(routeMapper.matchRoutes('/user/101')).toEqual([staticRouteKey, paramRouteKey]);
        });

        it('should match static route before param route (reversed order)', () => {
            const paramRouteKey = routeMapper.addRoute('/user/:id');
            const staticRouteKey = routeMapper.addRoute('/user/101');

            expect(routeMapper.matchRoutes('/user/101')).toEqual([staticRouteKey, paramRouteKey]);
        });

        it("should match param route before wildcard route", () => {
            const paramRouteKey = routeMapper.addRoute('/user/:id');
            const wildcardRouteKey = routeMapper.addRoute('/user/*');

            expect(routeMapper.matchRoutes('/user/123')).toEqual([paramRouteKey, wildcardRouteKey]);
        });

        it("should match param route before wildcard route (reversed order)", () => {
            const wildcardRouteKey = routeMapper.addRoute('/user/*');
            const paramRouteKey = routeMapper.addRoute('/user/:id');

            expect(routeMapper.matchRoutes('/user/123')).toEqual([paramRouteKey, wildcardRouteKey]);
        });

        it("should match param route before param + wildcard route", () => {
            const paramRouteKey = routeMapper.addRoute('/user/:id/:action');
            const paramWildcardRouteKey = routeMapper.addRoute('/user/:id/*');

            expect(routeMapper.matchRoutes('/user/123/stash')).toEqual([paramRouteKey, paramWildcardRouteKey]);
        });

        it("should match param route before param + wildcard route (reversed order)", () => {
            const paramWildcardRouteKey = routeMapper.addRoute('/user/:id/*');
            const paramRouteKey = routeMapper.addRoute('/user/:id/:action');

            expect(routeMapper.matchRoutes('/user/123/stash')).toEqual([paramRouteKey, paramWildcardRouteKey]);
        });

        it("should match param + wildcard route before wildcard route", () => {
            const paramWildcardRouteKey = routeMapper.addRoute('/user/:id/*');
            const wildcardRouteKey = routeMapper.addRoute('/user/*');

            expect(routeMapper.matchRoutes('/user/123/extra')).toEqual([paramWildcardRouteKey, wildcardRouteKey]);
        });

        it("should match param + wildcard route before wildcard route (reversed order)", () => {
            const wildcardRouteKey = routeMapper.addRoute('/user/*');
            const paramWildcardRouteKey = routeMapper.addRoute('/user/:id/*');

            expect(routeMapper.matchRoutes('/user/123/extra')).toEqual([paramWildcardRouteKey, wildcardRouteKey]);
        });

        it("should match static route before param + wildcard route", () => {
            const staticRouteKey = routeMapper.addRoute('/user/123/files');
            const paramWildcardRouteKey = routeMapper.addRoute('/user/:id/*');

            expect(routeMapper.matchRoutes('/user/123/files')).toEqual([staticRouteKey, paramWildcardRouteKey]);
        });

        it("should match static route before param + wildcard route (reversed order)", () => {
            const paramWildcardRouteKey = routeMapper.addRoute('/user/:id/*');
            const staticRouteKey = routeMapper.addRoute('/user/123/files');

            expect(routeMapper.matchRoutes('/user/123/files')).toEqual([staticRouteKey, paramWildcardRouteKey]);
        });

        it("should match multiple param routes", () => {
            const paramRouteKey1 = routeMapper.addRoute('/user/:id');
            const paramRouteKey2 = routeMapper.addRoute('/user/:id/:action');

            expect(routeMapper.matchRoutes('/user/123')).toEqual([paramRouteKey1]);
            expect(routeMapper.matchRoutes('/user/123/edit')).toEqual([paramRouteKey2]);
        });

        it("should match multiple wildcard routes", () => {
            const wildcardRouteKey1 = routeMapper.addRoute('/files/*');
            const wildcardRouteKey2 = routeMapper.addRoute('/files/any/*');

            expect(routeMapper.matchRoutes('/files/any')).toEqual([wildcardRouteKey1]);
            expect(routeMapper.matchRoutes('/files/any/path/details')).toEqual([wildcardRouteKey1, wildcardRouteKey2]);
        });
    });
});