import { createStore, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import * as Types from "@/shared/api/models.gen";

import { useRepoListQuery } from "./../api";

// import { coinGeckoApi } from '@/shared/api';

const pageMounted = createEvent();

export const getRepoListFx = createEffect(() => {
  const { data } = useRepoListQuery();
  return data?.user?.repositories;
  // coinGeckoApi.coins.getTrendingCoinList();
});

type repositorieState = Types.RepositoryConnection["nodes"];

export const repositoriesInitialState: repositorieState = [];

// const $repositories = createStore<repositorieState>(
//   repositoriesInitialState
// ).on(getRepoListFx.doneData, (state, repos) => repos?.nodes);

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
