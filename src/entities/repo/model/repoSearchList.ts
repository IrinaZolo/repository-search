import { AxiosResponse } from "axios";
import { createStore, createEffect, createEvent, sample } from "effector";

import { baseRequester } from "@/shared/api/base";

import {
  SearchRepoListQueryVariables,
  SearchRepoListQuery,
  searchRepoList,
} from "../api/repoSearchList";

export const searchChanged = createEvent<string>();

function getRepoSearchList(variables: SearchRepoListQueryVariables) {
  return baseRequester.post<AxiosResponse<SearchRepoListQuery>>("", {
    operationName: "searchRepoList",
    query: searchRepoList.loc.source.body,
    variables: variables,
  });
}

export const getRepoListFx = createEffect(({ variables }) => {
  return getRepoSearchList(variables);
});

type repositoriesType = SearchRepoListQuery["search"]["nodes"];

export const $repoSearchList = createStore<repositoriesType>([]);
export const $search = createStore<string>("");

export const $isSearchLoading = createStore<boolean>(false);
export const $searchError = createStore(null);
export const $searchErrorServer = createStore<Error>(null);

const initialVariables: SearchRepoListQueryVariables = {
  first: 10,
  query: "",
};

export const $variables =
  createStore<SearchRepoListQueryVariables>(initialVariables);

$search.on(searchChanged, (_, search) => search);
$variables.on(searchChanged, (_, search) => ({ first: 10, query: search }));

$repoSearchList.on(getRepoListFx.doneData, (_, payload) => {
  return payload?.data?.data?.search?.nodes;
});
$isSearchLoading.on(getRepoListFx.pending, (_, payload) => payload);
$searchErrorServer.on(
  getRepoListFx.fail,
  (_, payload) => payload?.error?.[0]?.message
);

sample({
  clock: searchChanged,
  source: { variables: $variables },
  target: getRepoListFx,
});
