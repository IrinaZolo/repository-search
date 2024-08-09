// import { ComponentType } from "react";
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
    path: "/",
    route: routes.main,
  },
  {
    path: "/repo/:repoId",
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
