import { AxiosResponse } from "axios";
import { createStore, createEffect, createEvent, sample } from "effector";

import { baseRequester } from "@/shared/api/base";

import {
  RepoListQuery,
  RepoListQueryVariables,
  repoList,
} from "../api/repoUserList";

export const pageMounted = createEvent();

function getUserRepo(variables: RepoListQueryVariables) {
  return baseRequester.post<AxiosResponse<RepoListQuery>>("", {
    operationName: "repoList",
    query: repoList.loc.source.body,
    variables: variables,
  });
}

export const getRepoListFx = createEffect(({ variables }) => {
  return getUserRepo(variables);
});

type repositoriesType = RepoListQuery["user"]["repositories"]["nodes"];

export const $repoList = createStore<repositoriesType>([]);

export const $isLoading = createStore<boolean>(false);
export const $error = createStore(null);
export const $errorServer = createStore<Error>(null);

const initialVariables: RepoListQueryVariables = {
  login: "IrinaZolo",
  first: 10,
  privacy: "PUBLIC",
};
export const $variables = createStore(initialVariables);

$repoList.on(getRepoListFx.doneData, (_, payload) => {
  return payload?.data?.data?.user?.repositories?.nodes;
});
$isLoading.on(getRepoListFx.pending, (_, payload) => payload);
$errorServer.on(
  getRepoListFx.fail,
  (_, payload) => payload?.error?.[0]?.message
);

sample({
  clock: pageMounted,
  source: { variables: $variables },
  target: getRepoListFx,
});

// $repoList.watch((state) => console.log("repo", state));
// $isLoading.watch((state) => console.log("loading", state));
// $error.watch((state) => console.log("error", state));
