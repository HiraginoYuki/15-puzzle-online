import React, { useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "../../global-state";
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
  const [room] = useGlobalState("room");
  const roomRef = Object.assign(useRef(room), {current: room});
  const keyMap = useRef({
    4:[0,0], 5:[1,0], 6:[2,0], 7:[3,0],
    r:[0,1], t:[1,1], y:[2,1], u:[3,1],
    f:[0,2], g:[1,2], h:[2,2], j:[3,2],
    v:[0,3], b:[1,3], n:[2,3], m:[3,3],
  } as { [key: string]: [number, number] });

  const tap = useCallback((e: KeyboardEvent) => {
    if (e.key === " ") {
      getSocketIO().emit("reset", roomRef.current);
    } else if (keyMap.current[e.key.toLowerCase()]) {
      getSocketIO().emit("tap", roomRef.current, keyMap.current[e.key.toLowerCase()]);
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener("keydown", tap, false);
  }, []);

  return (
    <main>
      <div className={props.isVisible ? styles.game : styles.game + " " + styles.hidden}>
        <div className={styles.puzzlecontainer}>
          {props.puzzles.map((puzzledata) => {
            return (
              <div className={getSocketIO().id == puzzledata[0] ? styles.puzzle : styles.puzzledisabled}>
                <p className={styles.username}>{puzzledata[0]}</p>
                <div className={styles.puzzlepiece}>
                  {puzzledata[1].sort((a,b) => a.id - b.id).map((piece: PieceData) => {
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
