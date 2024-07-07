import { ChangeEvent, useState } from "react";

import Input from "@/shared/ui/components/input/Input";

export default function SearchRepo() {
  const [searchValue, setSearchValue] = useState<string>();

  function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="">
      <Input type={"string"} value={searchValue} onChange={onChangeSearch} />
    </div>
  );
}
