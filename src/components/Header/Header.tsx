import React from 'react';
import { useCallback } from "react";
import { useGlobalState } from "../../global-state";
import { joinClass } from '../../join-class';
import { getSocketIO } from '../../use-socket-io';
import Logo from '../Icon/Logo';
import SettingsIcon from "../Icon/Settings";
import styles from "./Header.module.scss";

function leaveRoom(id: string) {
  getSocketIO().emit("leave_from_room", id);
}

export function Header() {
  const [, setShowSettingsWindow] = useGlobalState("showSettingsWindow");
  const [gameStatus,] = useGlobalState("gameStatus");
  const [room] = useGlobalState("room");
  const [roomCount,] = useGlobalState("roomcount");
  const openSettingsWindow = useCallback(() => setShowSettingsWindow(true), []);
  return (
    <header className={styles.header}>
      <Logo />
      <p className={styles.title} >15Puzzle Online</p>
      {gameStatus === "lobby" && <>
        <p className={styles.right}>Room Count: {roomCount}</p>
      </>}
      {gameStatus === "ingame" && <>
        <p className={styles.right}>RoomID: {room}</p>
        <div onClick={() => leaveRoom(room)} className={joinClass(styles.right, styles.leaveroom)}>Leave Room</div>
      </>}
      <SettingsIcon onClick={openSettingsWindow} />
    </header>
  );
}
