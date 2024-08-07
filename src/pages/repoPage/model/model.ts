import { sharedConfigRoutes } from "@/shared/config";

export const currentRoute = sharedConfigRoutes.routes.repo;

currentRoute.opened.watch(() => {
  console.info("repo route opened");
});
