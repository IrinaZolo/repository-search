import { createRoutesView } from "atomic-router-react";

import { mainPageLib } from "./mainPage";
import { notFoundPageUi } from "./notFoundPage";
import { repoPageLib } from "./repoPage";

export const Pages = createRoutesView({
  routes: [mainPageLib.MainRoute, repoPageLib.RepoRoute],
  otherwise: notFoundPageUi.NotFoundPage,
});
