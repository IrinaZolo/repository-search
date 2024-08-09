import { sharedConfigRoutes } from "@/shared/config/routes";

export const currentRoute = sharedConfigRoutes.routes.main;

currentRoute.opened.watch(() => {
  console.info("main route opened");
});
