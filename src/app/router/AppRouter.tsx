import { RouterProvider } from "atomic-router-react";

import { sharedConfigRoutes } from "@/shared/config";

import { Pages } from "@/pages";

import styles from "./AppRouter.module.css";

export const AppRouter = () => {
  return (
    <RouterProvider router={sharedConfigRoutes.router}>
      <div className={styles.container}>
        <Pages />
      </div>
    </RouterProvider>
  );
};
