// import { ApolloError } from "@apollo/client";
import * as Apollo from "@apollo/client";
import { createStore, createEffect, createEvent } from "effector";
// import { useUnit } from "effector-react";

import * as Types from "@/shared/api/models.gen";

import {
  // useRepoListQuery,
  RepoListQueryVariables,
  RepoListQueryHookResult,
  RepoListQuery,
  RepoListDocument,
} from "../api/repoUserList";

Types.RepositoryPrivacy;

export const pageMounted = createEvent();

const variables: RepoListQueryVariables = {
  login: "IrinaZolo",
  last: 10,
  privacy: Types.RepositoryPrivacy.Public,
  lastComment: 1,
};
// function useData() {
//   const result = useRepoListQuery({
//     variables,
//   });
//   return result;
// }

export const getRepoListFx = createEffect((variables) => {
  return Apollo.useQuery<RepoListQuery, RepoListQueryVariables>(
    RepoListDocument,
    variables
  );
});

type repositoriesType = RepoListQuery["user"]["repositories"]["nodes"];

export const repositoriesInitialState: repositoriesType = [];

export const $repoList = createStore<repositoriesType>(
  repositoriesInitialState
);

export const $isLoading =
  createStore<RepoListQueryHookResult["loading"]>(false);

export const $error = createStore<RepoListQueryHookResult["error"]>(null);
$error.on(getRepoListFx.doneData, (_, payload) => payload?.error);

$repoList.on(
  getRepoListFx,
  (_, payload) => payload?.data?.user?.repositories?.nodes
);

$isLoading.on(getRepoListFx.doneData, (_, payload) => payload?.loading);

$error.on(getRepoListFx.doneData, (_, payload) => payload?.error);

pageMounted.watch(() => getRepoListFx);

// sample({
//   clock: pageMounted,
//   target: getRepoListFx,
// });

// const useRepoList = () =>
//   useUnit([
//     $repositoriesList,
//     $repositoriesListIsLoading,
//     $repositoriesListError,
//     pageMounted,
//   ]);

// export const selectors = { useRepoList };
// export const events = { pageMounted };

$repoList.watch(() => console.log(getRepoListFx(variables)));
// $repositoriesListIsLoading.watch((state) => console.log(state));

// $repoList.on(pageMounted, (_, data)=>data)

pageMounted.watch(() => {
  getRepoListFx(variables);
});
