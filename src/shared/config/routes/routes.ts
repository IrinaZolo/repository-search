import { ComponentType } from "react";

export enum RouteName {
  MAIN_PAGE = "/",
  REPO_PAGE = "/repo/:repoId",
}

export interface RouteDescription {
  path: RouteName;
  component: ComponentType;
}
