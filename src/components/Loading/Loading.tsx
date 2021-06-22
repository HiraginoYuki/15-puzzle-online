import React from 'react';
import ReactLoading from "react-loading";
import styles from "./Loading.module.scss";

interface LoadingProps {
  isVisible: boolean;
  loadingMessage: string;
}

export function Loading(props: LoadingProps) {
  return (
    <main>
      <div className={props.isVisible ? styles.loading : styles.loading + " " + styles.hidden}>
        <p>{props.loadingMessage}</p>
        <br />
        <ReactLoading type="spin" color="#ffffff" height={32} width={32} className={styles.loadingspinner} />
      </div>
    </main>
  );
}
