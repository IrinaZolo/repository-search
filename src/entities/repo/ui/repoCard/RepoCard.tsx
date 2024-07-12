import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Link, useNavigate } from "react-router-dom";

import RepoIcon from "./icons/repo-icon.svg?react";
import StarRepoIcon from "./icons/star-repo.svg?react";
import styles from "./RepoCard.module.css";

export default function RepoCard(props: {
  id: string;
  name: string;
  starsCount: number;
  url: string;
  lastCommitDate?: string;
}) {
  const naigate = useNavigate();

  function navigateToGitHub(url: string) {
    return () => naigate(url);
  }

  function formattedDate(initialDate) {
    if (initialDate) {
      const dateObj = new Date(initialDate);

      return format(dateObj, "dd MMMM yyyy г.", { locale: ru });
    }
    return "";
  }

  return (
    <Link to={`/repo/${props.id}`} className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <RepoIcon />
          <h2>{props.name}</h2>
        </div>
        <div className={styles.starContainer}>
          <StarRepoIcon /> <span>{props.starsCount}</span>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        {!!props?.lastCommitDate && (
          <div className={styles.updateAt}>
            Обновлено {formattedDate(props.lastCommitDate)}
          </div>
        )}
        <button
          onClick={navigateToGitHub(props.url)}
          className={styles.linkToGitHub}
        >
          Перейти на GitHub
        </button>
      </div>
    </Link>
  );
}
