import { sharedConfigRoutes } from "@/shared/config";

export const currentRoute = sharedConfigRoutes.routes.main;

currentRoute.opened.watch(() => {
  console.info("main route opened");
});
