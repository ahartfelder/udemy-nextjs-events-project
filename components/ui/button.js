import Link from "next/link";

import styles from "../../styles/button.module.css";

export default function Button(props) {
  if (props.link) {
    return (
      <Link className={styles.btn} href={props.link}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={styles.btn}
      onClick={props.onClick}
      disabled={props.loading}
    >
      {props.children}
    </button>
  );
}
