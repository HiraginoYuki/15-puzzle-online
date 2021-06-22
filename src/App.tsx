import React, { useEffect, useState } from "react";
import "reset-css";
import { Header } from "./components/Header/Header";
import { Loading } from "./components/Loading/Loading";
import { Lobby, RoomData } from "./components/Lobby/Lobby";
import { Game } from "./components/Game/Game";
import { Footer } from "./components/Footer/Footer";
import { useSocketIO } from "./use-socket-io";
import Collection from "@discordjs/collection";
import { SettingWindow } from "./components/SettingWindow/SettingWindow";
import { useGlobalState } from "./global-state";


export function App() {
  const [gameStatus, setGameStatus] = useGlobalState("gameStatus");
  const [rooms, setRooms] = useState<Collection<string, RoomData>>(new Collection());
  const [, setRoom] = useGlobalState("room");
  const [, setRoomcount] = useGlobalState("roomcount");
  const [puzzles, setPuzzles] = useState([]);
  const io = useSocketIO("localhost:3250");
  useEffect(() => {
    io.on("connect", () => {
        setGameStatus("lobby");
      })
      .on("disconnect", () => {
        setGameStatus("reconnecting");
      })
      .on("rooms", (rooms: [string, RoomData][]) => {
        console.log("rooms");
        console.log(rooms);
        setRooms(new Collection(rooms));
      })
      .on("room", (room: string) => {
        setRoom(room);
      })
      .on("roomcount", (roomcount: string) => {
        setRoomcount(roomcount);
      })
      .on("game", (puzzles: []) => {
        setGameStatus("ingame");
        setPuzzles(puzzles);
      })
      .on("leave", () => {
        setGameStatus("lobby");
      });
  }, [io]);
  return <>
    <div>
      <Header />
      <Loading loadingMessage="Connecting..." isVisible={gameStatus === "connecting"} />
      <Loading loadingMessage="Reconnecting..." isVisible={gameStatus === "reconnecting"} />
      <Lobby isVisible={gameStatus === "lobby"} rooms={rooms} />
      <Game isVisible={gameStatus === "ingame"} puzzles={puzzles}/>
      <Footer />
      <SettingWindow />
    </div>
  </>;
}
