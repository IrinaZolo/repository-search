import { ChangeEvent, useState } from "react";

import Input from "@/shared/ui/components/input/Input";

import styles from "./SearchRepo.module.css";

export function SearchRepo() {
  const [searchValue, setSearchValue] = useState<string>("");

  function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className={styles.container}>
      <Input
        type={"string"}
        value={searchValue}
        isSearch
        onChange={onChangeSearch}
      />
      <div className={styles.cardsContainer}></div>
    </div>
  );
}
