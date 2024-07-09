import { createStore, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import * as Types from "@/shared/api/models.gen";

import {
  useRepoListQuery,
  RepoListQueryVariables,
  RepoListQueryHookResult,
  RepoListQuery,
} from "./../api";

// import { coinGeckoApi } from '@/shared/api';

Types.RepositoryPrivacy;

const pageMounted = createEvent();

export const getRepoListFx = createEffect<
  RepoListQueryVariables,
  RepoListQueryHookResult
>(() => {
  const result = useRepoListQuery({
    variables: {
      login: "IrinaZolo",
      last: 10,
      privacy: Types.RepositoryPrivacy.Public,
      lastComment: 1,
    },
  });
  return result;
  // coinGeckoApi.coins.getTrendingCoinList();
});

type repositoriesState = RepoListQuery["user"];

export const repositoriesInitialState: repositoriesState = [];

const $repositories = createStore<repositoriesState>(
  repositoriesInitialState
).on(
  getRepoListFx.doneData,
  (_, payload) => payload?.data?.user?.repositories?.nodes
);

// export const $repositoriesList = $repositories;
// export const $repositoriesListIsLoading = getRepoListFx.pending;
// export const $coinListIsEmpty = !$repositoriesList;

// const useRepoList = () => useStore($repositoriesList);
// export const selectors = { useRepoList };
// export const events = { pageMounted };

// $repositoriesList.watch((state) => console.debug(state));

// pageMounted.watch(() => {
//   getRepoListFx();
// });
