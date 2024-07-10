import { useUnit } from "effector-react";
import { ChangeEvent, useEffect, useState } from "react";

import Input from "@/shared/ui/components/input/Input";

import { repoUserListSubModel } from "@/entities/repo/model";

import styles from "./SearchRepo.module.css";

export function SearchRepo() {
  const [searchValue, setSearchValue] = useState<string>("");

  const { $repoList, $isLoading, pageMounted } = repoUserListSubModel;

  const [repoList, isLoading] = useUnit([$repoList, $isLoading]);

  function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    pageMounted();
  }, []);

  return (
    <div className={styles.container}>
      <Input
        type={"string"}
        value={searchValue}
        isSearch
        onChange={onChangeSearch}
      />
      <div className={styles.cardsContainer}>
        {!isLoading ? (
          repoList?.map((repo, index) => (
            <div key={index}>
              <h1>{repo.name}</h1>
            </div>
          ))
        ) : (
          <div>loading ...</div>
        )}
      </div>
    </div>
  );
}
