// import { ComponentType } from "react";
import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
  UnmappedRouteObject,
} from "atomic-router";
// import { sample } from "effector";
import { createBrowserHistory } from "history";

// import { sharedConfigInit } from "@/shared/config";
import { appStarted } from "../init";

// export enum RouteName {
//   MAIN_PAGE = "/",
//   REPO_PAGE = "/repo/:repoId",
// }

// export interface RouteDescription {
//   path: RouteName;
//   component: ComponentType;
// }

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

router.setHistory(createBrowserHistory());
appStarted.watch(() => {
  console.log("app started");
});
// sample({
//   clock: sharedConfigInit.appStarted,
//   fn: () => createBrowserHistory(),
//   target: router.setHistory,
// });
