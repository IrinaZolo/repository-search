import { InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.inputGroup}>
      <input className={styles.input} {...props} />
    </div>
  );
}
