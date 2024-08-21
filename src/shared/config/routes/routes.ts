import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
  UnmappedRouteObject,
} from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";

import { appStarted } from "../init";

export const routes = {
  main: createRoute(),
  repo: createRoute<{ repoId: string }>(),
};

const routesMap: UnmappedRouteObject<any>[] = [
  {
    path: "/repository-search/",
    route: routes.main,
  },
  {
    path: "/repository-search/repo/:repoId",
    route: routes.repo,
  },
];

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
