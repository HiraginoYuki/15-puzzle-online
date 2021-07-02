import React from "react";
import { Collection } from "@discordjs/collection";
import styles from "./Lobby.module.scss";
import { getSocketIO } from "../../use-socket-io";
import { useGlobalState } from "../../global-state";

interface LobbyProps {
  isVisible: boolean;
  rooms: Collection<string, RoomData>;
}

export type RoomData = {
  id: string;
  name: string;
  description: string;
  haspassword: boolean;
  members: string[];
  maxmemberCount: number;
};

export function Lobby(props: LobbyProps) {
  const [, setRoom] = useGlobalState("room");

  function joinRoom(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const room = String((e.target as HTMLDivElement).getAttribute("data-key"));
    getSocketIO().emit("join_to_room", room);
    setRoom(room);
  }

  function createRoom() {
    const roomName = (document.getElementById("roomname_input") as HTMLInputElement).value;
    const roomDescription = (document.getElementById("roomdescription_input") as HTMLInputElement).value;
    const roomPassword = (document.getElementById("roompassword_input") as HTMLInputElement).value;
    getSocketIO().emit("create_room", roomName, roomDescription, roomPassword);
  }

  return (
    <main>
      <div className={props.isVisible ? styles.lobby : styles.lobby + " " + styles.hidden}>
        <div className={styles.roomcreatebox}>
          <input type="text" id="roomname_input" placeholder="Room Name (Required)"></input>
          <br></br>
          <input type="text" id="roomdescription_input" placeholder="Room Description (Optional)"></input>
          <br></br>
          <input type="text" id="roompassword_input" placeholder="Password (Optional)"></input>
          <button onClick={createRoom}>Create Room</button>
        </div>
        <div className={styles.roomlist}>
          {props.rooms.map(({ id, name, description, haspassword, members, maxmemberCount }) => {
            return (
              <div className={styles.room} onClick={joinRoom} key={id} data-key={id}>
                <p>{name}</p>
                <p>{description}</p>
                <p>{members.length} / {maxmemberCount}</p>
                <p>haspassword: {haspassword ? "false" : "true"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
