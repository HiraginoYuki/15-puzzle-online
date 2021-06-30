import React, { useCallback } from "react";
import { useGlobalState } from "../../global-state";
import { joinClass } from "../../join-class";
import Close from "../Icon/Close";
import styles from "./SettingWindow.module.scss";

const LOCAL_STORAGE_UUID = "825a9cc1-022f-4858-9245-d19607d463fa";

/*function saveSetting() {
  window.localStorage.setItem(LOCAL_STORAGE_UUID, "aa");
}*/

export function SettingWindow() {
  const [showSettingsWindow, setShowSettingsWindow] = useGlobalState("showSettingsWindow");
  const closeSettingsWindow = useCallback(() => setShowSettingsWindow(false), []);
  return (
    <div className={joinClass(styles.blur, !showSettingsWindow && styles.hidden)}>
      <div className={joinClass(styles.settingWindow, !showSettingsWindow && styles.hidden)}>
        <div className={styles.titleBar}>
          <p className={ styles.title }>Setting</p>
          <div className={styles.closeButton}>
            <Close onClick={closeSettingsWindow} />
          </div>
        </div>
        <div  className={styles.content}>
          <p>
            aaaa
          </p>
        </div>
      </div>
    </div>
  );
}
