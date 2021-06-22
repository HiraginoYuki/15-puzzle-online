import { createGlobalState } from "react-hooks-global-state";

export type GameStatus = "connecting" | "reconnecting" | "lobby" | "ingame";
export const { useGlobalState } = createGlobalState({
  showSettingsWindow: false,
  room: "",
  roomcount: "",
  gameStatus: "connecting" as GameStatus
});
