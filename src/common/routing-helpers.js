// @flow

import pathToRegexp from 'path-to-regexp';
import { matchPath } from 'react-router';

import type {
  SiteRoutes,
  SiteRoute,
  CurrentRoute,
} from './types';

export function getAbsolutePath(pathname: string = ''): string {
  const absolutePath = pathToRegexp.parse(pathname)[0];
  return `${absolutePath}${absolutePath && absolutePath.endsWith('/') ? '' : '/'}`;
}

export function getAllPaths(routes: SiteRoutes) {
  return routes.reduce((paths, route) => {
    const newPaths = [];

    const { path } = route;
    if (typeof path === 'string') {
      newPaths.push(getAbsolutePath(path));
    }

    const subRoutes = route.routes;
    if (subRoutes) {
      newPaths.push(...getAllPaths(subRoutes));
    }

    return paths.concat(newPaths);
  }, []);
}

export function getRouteFromPath(routes: SiteRoutes, pathname: string): CurrentRoute | null {
  function findRoute(searchRoutes: Array<SiteRoute>, parent?: CurrentRoute) {
    return searchRoutes.reduce((key, route, index) => {
      if (typeof route.path === 'string') {
        const matched = matchPath(pathname, route.path);

        if (matched && matched.isExact) {
          if (route.routes) {
            const subRouteKey = findRoute(route.routes, {
              key: route.key, index, parent, pathname: getAbsolutePath(route.path),
            });

            if (subRouteKey) {
              return subRouteKey;
            }
          }

          return {
            key: route.key, index, parent, pathname,
          };
        }
      }

      return key;
    }, null);
  }

  return findRoute(routes);
}

export function getRouteFromKey(routes: SiteRoutes, routeKey: string): SiteRoute | null {
  function findRoute(searchRoutes) {
    return searchRoutes.reduce((found, route) => {
      if (route.key === routeKey) {
        return route;
      }

      const subRoutes = route.routes;
      if (subRoutes) {
        const foundSubRoute = findRoute(subRoutes);

        if (foundSubRoute) {
          return foundSubRoute;
        }
      }

      return found;
    }, null);
  }

  return findRoute(routes);
}

function getNextPath(routes: SiteRoutes, currentRouteIndex: number, delta: number) {
  const navigableRoutes = routes.filter((route) => route.path);

  let newIndex;
  if (delta > 0) {
    const maxRouteIndex = navigableRoutes.length - 1;
    newIndex = currentRouteIndex + delta > maxRouteIndex ? maxRouteIndex : currentRouteIndex + delta;
  } else {
    newIndex = currentRouteIndex + delta < 0 ? 0 : currentRouteIndex + delta;
  }

  if (newIndex === currentRouteIndex) {
    return null;
  }

  const nextPath = navigableRoutes[newIndex].path;
  return getAbsolutePath(nextPath);
}

export function getNewPathFromSwipe(routes: SiteRoutes, currentRoute: CurrentRoute, deltaX: number, deltaY: number) {
  const currentPath = currentRoute.pathname;
  const horizontal = Math.abs(deltaX) > Math.abs(deltaY);

  if (horizontal) {
    const delta = deltaX > 0 ? 1 : -1;
    const currentRouteIndex = currentRoute.parent ? currentRoute.parent.index : currentRoute.index;
    return getNextPath(routes, currentRouteIndex, delta) || currentPath;
  }

  return null;
}
