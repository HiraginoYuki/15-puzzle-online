import React, { CSSProperties } from "react";
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
    if (props.piece.id) {
      if (getSocketIO().id == props.socketid) getSocketIO().emit("tap", room, [props.piece.x, props.piece.y]);
    }
  }
  return (
    <div
      onMouseDown={tapPiece}
      className={joinClass(props.piece.id == 0 ? styles.hidden : styles.piece, props.piece.id == props.piece.index + 1 ? styles.correct : "")}
      style={{ "--x": props.piece.x, "--y": props.piece.y } as CSSProperties}
    >
      <div className={styles.content}>
        {props.piece.id || ""}
      </div>
    </div>
  );
}
