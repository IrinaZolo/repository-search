import { useUnit } from "effector-react";
import { useEffect } from "react";

import Input from "@/shared/ui/components/input/Input";

import {
  repoUserListSubModel,
  repoSearchListSubModel,
} from "@/entities/repo/model";
import { RepoCard } from "@/entities/repo/ui";

import styles from "./SearchRepo.module.css";

export function SearchRepo() {
  const { $repoList, $isLoading, pageMounted } = repoUserListSubModel;
  const { $repoSearchList, $isSearchLoading, searchChanged, $search } =
    repoSearchListSubModel;

  const [repoList, isLoading, repoSearchList, isSearchLoading, search] =
    useUnit([
      $repoList,
      $isLoading,
      $repoSearchList,
      $isSearchLoading,
      $search,
    ]);

  function onChangeSearch(e) {
    searchChanged(e.target.value);
  }

  useEffect(() => {
    pageMounted();
  }, []);

  return (
    <div className={styles.container}>
      <Input
        type={"string"}
        placeholder="Введите наименование репозитория"
        value={search}
        isSearch
        onChange={onChangeSearch}
      />
      <div className={styles.cardsContainer}>
        {/* <>
          <RepoCard
            key={0}
            id={"12313"}
            name={"scan"}
            starsCount={5}
            url={"#"}
            lastCommitDate={"02.05.2022"}
          />
        </> */}
        {!search &&
          !isLoading &&
          !isSearchLoading &&
          repoList?.map((node, index) => (
            <RepoCard
              key={index}
              id={node.id}
              name={node.name}
              starsCount={node.stargazerCount}
              url={node.url}
              lastPushedDate={node?.pushedAt}
            />
          ))}
        {!isSearchLoading &&
          !isLoading &&
          repoSearchList?.length > 0 &&
          repoSearchList?.map((node, index) => (
            <RepoCard
              key={index}
              id={node.id}
              name={node.name}
              starsCount={node.stargazerCount}
              url={node?.url}
              lastPushedDate={node?.pushedAt}
            />
          ))}
        {!isLoading &&
          !isSearchLoading &&
          ((!(repoSearchList?.length > 0) && search) ||
            (!(repoList?.length > 0) && !search)) && (
            <div>repositories not found</div>
          )}
        {(isLoading || isSearchLoading) && <div>loading ...</div>}
      </div>
    </div>
  );
}
