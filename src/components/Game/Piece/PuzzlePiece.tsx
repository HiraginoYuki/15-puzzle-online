import React from "react";
import { useGlobalState } from "../../../global-state";
import { joinClass } from "../../../join-class";
import { getSocketIO } from "../../../use-socket-io";
import { PieceData } from "../Game";
import styles from "./PuzzlePiece.module.scss";

interface PieceProps {
  socketid: string;
  piece: PieceData;
  correct: boolean;
}


export function PuzzlePiece(props: PieceProps) {
  const [room,] = useGlobalState("room");
  function tapPiece() {
    if (getSocketIO().id == props.socketid) getSocketIO().emit("tap", room, [props.piece.x, props.piece.y]);
  }
  return (
    <>
      <div onMouseDown={tapPiece} className={joinClass(styles.piece, props.piece.id == props.piece.index + 1 ? styles.correct : "")}>{props.piece.id == 0 ? "" : props.piece.id}</div>
    </>
  );
}