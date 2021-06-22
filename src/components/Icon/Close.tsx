import React from "react";
import styles from "./Settings.module.scss";

function Close(props: { onClick: () => any }) {
  return (
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={styles.close} onClick={ props.onClick }>
      <g fill="#fff" className={styles.closeIcon}>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </g>
    </svg>
  );
};

export default Close;