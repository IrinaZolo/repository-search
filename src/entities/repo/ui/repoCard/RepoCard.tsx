import { Link } from "atomic-router-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { sharedConfigRoutes } from "@/shared/config/routes";

import RepoIcon from "./icons/repo-icon.svg?react";
import StarRepoIcon from "./icons/star-repo.svg?react";
import styles from "./RepoCard.module.css";

export default function RepoCard(props: {
  id: string;
  name: string;
  starsCount: number;
  url: string;
  lastPushedDate?: string;
}) {
  function navigateToGitHub() {
    return (e) => {
      e.preventDefault();
      window.open(props.url, "_blank");
    };
  }

  function formattedDate(initialDate) {
    if (initialDate) {
      const dateObj = new Date(initialDate);

      return format(dateObj, "dd MMMM yyyy г.", { locale: ru });
    }
    return "";
  }

  return (
    <Link
      to={sharedConfigRoutes.routes.repo}
      params={{ repoId: props.id }}
      className={styles.container}
    >
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
        {!!props?.lastPushedDate && (
          <div className={styles.updateAt}>
            Обновлено {formattedDate(props.lastPushedDate)}
          </div>
        )}
        <button onClick={navigateToGitHub()} className={styles.buttonToGitHub}>
          Перейти на GitHub
        </button>
      </div>
    </Link>
  );
}
