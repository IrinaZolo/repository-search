import { InputHTMLAttributes } from "react";

import SearchIcon from "./icons/search.svg?react";
import styles from "./Input.module.css";

export default function Input({
  isSearch = false,

  ...props
}: InputHTMLAttributes<HTMLInputElement> & { isSearch?: boolean }) {
  return (
    <div className={styles.inputGroup}>
      {isSearch && <SearchIcon />}
      <input className={styles.input} {...props} />
    </div>
  );
}
