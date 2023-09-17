"use client";
import Image from "next/image";
import { db } from "./utils/firestore/connection";
import { collection, getDocs } from "firebase/firestore/lite";
import { query, where } from "firebase/firestore";

async function getUsers() {
  const userCol = collection(db, "user");
  const userSnapshot = await getDocs(userCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  console.log(userList);
  return userList;
}

async function getPlayed(puuid: string) {
  const gameRef = collection(db, "game");
  const q = query(gameRef, where("name", "==", "game 1"));
  // const snapshot = await getCountFromServer(q);
  // console.log("count: ", snapshot.data().count);
}

// const userList = userSnapshot.docs.map((doc) => doc.data());

// const q = query(gameRef, where("country", "not-in", ["USA", "Japan"]));
// const snapshot = await getCountFromServer(q);

async function getGames() {
  const gameCol = collection(db, "game");
  const gameSnapshot = await getDocs(gameCol);
  const gameList = gameSnapshot.docs.map((doc) => doc.data());
  console.log(gameList);
  return gameList;
}
export default function Home() {
  return (
    <div>
      <div className="" onClick={() => getUsers()}>
        ciaooo
      </div>
      <div onClick={() => getPlayed("")}>palogay</div>
      <div className="" onClick={() => getGames()}>
        ciaooo2222
      </div>
    </div>
  );
}
