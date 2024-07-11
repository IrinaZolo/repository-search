import { Route, Routes, BrowserRouter } from "react-router-dom";

import { sharedConfigRoutes } from "@/shared/config";

import { mainPageUi } from "@/pages/mainPage";
import { repoPageUi } from "@/pages/repoPage";

import styles from "./AppRouter.module.css";

export const AppRouter = () => {
  const { MAIN_PAGE, REPO_PAGE } = sharedConfigRoutes.RouteName;

  const { MainPage } = mainPageUi;
  const { RepoPage } = repoPageUi;

  const routes: sharedConfigRoutes.RouteDescription[] = [
    {
      path: MAIN_PAGE,
      component: MainPage,
    },
    {
      path: REPO_PAGE,
      component: RepoPage,
    },
  ];

  const routesContent = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Routes>
          {routesContent}
          <Route path="*" element={<div>not found page</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
