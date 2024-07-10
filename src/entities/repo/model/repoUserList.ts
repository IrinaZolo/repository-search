import { AxiosResponse } from "axios";
import { createStore, createEffect, createEvent, sample } from "effector";

import axios from "@/shared/api/base";
import * as Types from "@/shared/model/models.gen";

import { RepoListQuery, RepoListQueryVariables } from "../api/repoUserList";

Types.RepositoryPrivacy;

export const pageMounted = createEvent();

const variables: RepoListQueryVariables = {
  login: "IrinaZolo",
  last: 10,
  privacy: Types.RepositoryPrivacy.Public,
  lastComment: 1,
};

const query: string = `
query RepoList(
  $login: String!
  $last: Int
  $privacy: RepositoryPrivacy
  $lastComment: Int
) {
  user(login: $login) {
    repositories(last: $last, privacy: $privacy) {
      nodes {
        name
        stargazerCount
        commitComments(last: $lastComment) {
          nodes {
            createdAt
          }
        }
        url
      }
    }
  }
}
`;

type QueryParams = {
  operationName: string;
  query: string;
  variables: RepoListQueryVariables;
};

function getUserRepo(params: QueryParams) {
  return axios.post<AxiosResponse<RepoListQuery>>("", {
    operationName: params.operationName,
    query: params.query,
    variables: params.variables,
  });
}

export const getRepoListFx = createEffect((params: QueryParams) => {
  return getUserRepo(params);
});

type repositoriesType = RepoListQuery["user"]["repositories"]["nodes"];

export const repositoriesInitialState: repositoriesType = [];

export const $repoList = createStore<repositoriesType>(
  repositoriesInitialState
);

export const $isLoading = createStore<boolean>(false);

export const $error = createStore(null);
export const $errorServer = createStore<Error>(null);

$repoList.on(getRepoListFx.doneData, (_, payload) => {
  console.log("payload", payload.data);
  return payload?.data?.data?.user?.repositories?.nodes;
});

$isLoading.on(getRepoListFx.pending, (_, payload) => payload);

$errorServer.on(
  getRepoListFx.fail,
  (_, payload) => payload?.error?.[0]?.message
);

sample({
  clock: pageMounted,
  fn: () => ({
    operationName: "RepoList",
    query: query,
    variables: variables,
  }),
  target: getRepoListFx,
});

$repoList.watch((state) => console.log("repo", state));
$isLoading.watch((state) => console.log("loading", state));
$error.watch((state) => console.log("error", state));

// pageMounted.watch(() => {
//   getRepoListFx({
//     operationName: "RepoList",
//     query: query,
//     variables: variables,
//   });
// });
