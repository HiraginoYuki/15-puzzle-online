import React from "react";
import { getSocketIO } from "../../use-socket-io";
import styles from "./Game.module.scss";
import { PuzzlePiece } from "./Piece/PuzzlePiece";

interface GameProps {
  isVisible: boolean;
  puzzles: [string, PieceData[]][]
}

export interface PieceData {
  x: number
  y: number
  index: number
  id: number
}

export function Game(props: GameProps) {
  return (
    <main>
      <div className={props.isVisible ? styles.game : styles.game + " " + styles.hidden}>
        <div>
          {props.puzzles.map((puzzledata) => {
            return (
              <div className={getSocketIO().id == puzzledata[0] ? styles.puzzle : styles.puzzledisabled}>
                <p>{puzzledata[0]}</p>
                <div className={styles.puzzlepiece}>
                  {puzzledata[1].map((piece: PieceData) => {
                    return <PuzzlePiece socketid={puzzledata[0]} piece={piece} correct={false}></PuzzlePiece>
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
