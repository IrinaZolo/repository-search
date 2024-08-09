import { sharedConfigRoutes } from "@/shared/config/routes";

export const currentRoute = sharedConfigRoutes.routes.repo;

currentRoute.opened.watch(() => {
  console.info("repo route opened");
});
