import { FunctionComponent } from "react";

import { sharedConfigRoutes } from "@/shared/config/routes";
// import { useParams } from "react-router-dom";

export const RepoPage: FunctionComponent = () => {
  const { repoId } = sharedConfigRoutes.routes.repo.$params.getState();

  return (
    <div>
      repo page:
      {repoId}
    </div>
  );
};
