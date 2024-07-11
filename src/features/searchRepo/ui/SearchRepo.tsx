import { useUnit } from "effector-react";
import { useEffect } from "react";

import Input from "@/shared/ui/components/input/Input";

import { RepoFieldsFragment } from "@/entities/repo/api/repoSearchList";
import {
  repoUserListSubModel,
  repoSearchListSubModel,
} from "@/entities/repo/model";

import styles from "./SearchRepo.module.css";

export function SearchRepo() {
  // const [searchValue, setSearchValue] = useState<string>("");

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
        value={search}
        isSearch
        onChange={onChangeSearch}
      />
      <div className={styles.cardsContainer}>
        {!search ? (
          !isLoading ? (
            repoList?.map((repo, index) => (
              <div key={index}>
                <h1>{repo.name}</h1>
              </div>
            ))
          ) : (
            <div>loading ...</div>
          )
        ) : !isSearchLoading ? (
          repoSearchList?.length > 0 ? (
            repoSearchList?.map((node, index) => {
              const repo = node as RepoFieldsFragment;
              return (
                <div key={index}>
                  <h1>{repo.name}</h1>
                </div>
              );
            })
          ) : (
            <div>repositories not found</div>
          )
        ) : (
          <div>loading ...</div>
        )}
      </div>
    </div>
  );
}
