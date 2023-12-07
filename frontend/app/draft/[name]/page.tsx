"use client";
import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import Image from "next/image";

const socket: Socket = io("https://backend-efmleague.onrender.com:3001", {
  path: "/draft/",
});

const url = window.location.href;
const startIndex = url.indexOf("/draft/");
const endIndex = url.indexOf("$");
var room = url.substring(startIndex + 7, endIndex + 1);
var passwordSide = url.substring(endIndex + 1);

if (room.length) socket.emit("join_room", room);

export default function page() {
  const [squad, setSquad] = useState({ blueSide: "", redSide: "" });
  const [message, setMessage] = useState("");

  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    socket.on(
      "receive_message",
      (data: { message: string; sender: string }) => {
        setMessageReceived(data.message);
      }
    );
    socket.on("receive_room", (data: { teamBlue: string; teamRed: string }) => {
      setSquad({ blueSide: data.teamBlue, redSide: data.teamRed });
    });
    console.log(socket);
  }, [socket]);

  const sendMessage = () => {
    socket.emit("send_message", { message, room, passwordSide });
  };

  return (
    <div className="bg-blue-gray-900 h-screen">
      <div className="flex justify-between pt-10">
        <p className="text-3xl font-bold bg-blue-500 px-10">{squad.blueSide}</p>
        <p className="text-3xl font-bold bg-red-500 px-10">{squad.redSide}</p>
      </div>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        className="border-2 border-black"
      />

      <button onClick={sendMessage}> Send Message</button>
      <p>{messageReceived}</p>
      <img
        src={
          "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/" +
          messageReceived +
          ".png"
        }
        alt=""
        width={48}
        height={48}
        className="h-12 w-12"
      />
    </div>
  );
}
