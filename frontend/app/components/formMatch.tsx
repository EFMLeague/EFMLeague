"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FormMatch({ fetchedUsers }: { fetchedUsers: any }) {
  const supabase = createClientComponentClient<any>();

  // STATI MATCH
  const [matchName, setMatchName] = useState("");
  const [matchDate, setMatchDate] = useState("");

  // STATI PLAYER
  const [blue, setBlue] = useState({
    top: "",
    jng: "",
    mid: "",
    adc: "",
    sup: "",
  });

  const [red, setRed] = useState({
    top: "",
    jng: "",
    mid: "",
    adc: "",
    sup: "",
  });

  const [winner, setWinner] = useState<"blue" | "red">("red");
  const [MVP, setMVP] = useState("");
  const [users, setUsers] = useState(fetchedUsers);
  const [allowedMVP, setAllowedMVP] = useState<any[]>([]);

  const handleChangeWinner = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWinner(
      e.target.value === "blue" || e.target.value === "red"
        ? e.target.value
        : "red"
    );
  };

  useEffect(() => {
    if (winner === "red") {
      setAllowedMVP(
        users.filter(
          (user: any) =>
            user.id === red.top ||
            user.id === red.jng ||
            user.id === red.mid ||
            user.id === red.adc ||
            user.id === red.sup
        )
      );
      console.log(users);
    }
    if (winner === "blue") {
      setAllowedMVP(
        users.filter(
          (user: any) =>
            user.id === blue.top ||
            user.id === blue.jng ||
            user.id === blue.mid ||
            user.id === blue.adc ||
            user.id === blue.sup
        )
      );
      console.log(users);
    }
  }, [winner, blue, red]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await supabase
      .from("Match")
      .insert({ name: matchName, date: matchDate });
    if (res.status != 201) {
      return;
    }

    console.log(res);
  };

  return (
    <div>
      <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>
      <form
        className="d-flex flex-wrap w-100"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="d-flex flex-wrap w-100 bg-white justify-content-center">
          <div className="w-100 d-flex justify-content-center">
            <p className="bg-dark match-title ">MATCH</p>
          </div>
          <div className="input-match">
            <label className="label-match">MATCH NAME:</label>
            <input
              type="text"
              className="label-match"
              required
              onChange={(e) => setMatchName(e.target.value)}
            />
          </div>
          <div className="input-match">
            <label className="label-match">DAY OF THE MATCH:</label>
            <input
              type="datetime-local"
              className="label-match"
              required
              onChange={(e) => setMatchDate(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center w-100 p-4">
            <img src="./img/trofeo.png" width={150} alt="" />
            <label className="label-match">WINNERS</label>
            <select
              className="label-match"
              required
              onChange={(e) => handleChangeWinner(e)}
            >
              <option value="blue">BLUE</option>
              <option value="red">RED</option>
            </select>
            <img src="./img/trofeo.png" width={150} alt="" />
          </div>
        </div>
        <div className="bg-primary side">
          <p className="team-name text-center">TEAM BLUE</p>
          <div className="line-role-name">
            <img src="./img/roles/top.png" className="p-1" height={50} alt="" />
            <p className="ruoli-blue">TOP:</p>
            <select
              className="select-player"
              required
              onChange={(e) =>
                setBlue((blue) => ({ ...blue, top: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="line-role-name">
            <img
              src="./img/roles/jungle.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">JUNGLE:</p>

            <select
              className="select-player"
              required
              onChange={(e) =>
                setBlue((blue) => ({ ...blue, jng: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <img src="./img/roles/mid.png" className="p-1" height={50} alt="" />
            <p className="ruoli-blue">MID:</p>

            <select
              className="select-player"
              required
              onChange={(e) =>
                setBlue((blue) => ({ ...blue, mid: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <img src="./img/roles/bot.png" className="p-1" height={50} alt="" />
            <p className="ruoli-blue">ADC:</p>

            <select
              className="select-player"
              required
              onChange={(e) =>
                setBlue((blue) => ({ ...blue, adc: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <img
              src="./img/roles/support.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">SUPP:</p>

            <select
              className="select-player"
              required
              onChange={(e) =>
                setBlue((blue) => ({ ...blue, sup: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="side bg-danger">
          <p className="team-name text-center">TEAM RED</p>
          <div className="line-role-name">
            <img src="./img/roles/top.png" className="p-1" height={50} alt="" />
            <p className="ruoli-red">TOP:</p>

            <select
              className="select-player"
              required
              onChange={(e) =>
                setRed((red) => ({ ...red, top: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <img
              src="./img/roles/jungle.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-red">JUNGLE:</p>

            <select
              className="select-player"
              required
              onChange={(e) =>
                setRed((red) => ({ ...red, jng: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <img src="./img/roles/mid.png" className="p-1" height={50} alt="" />
            <p className="ruoli-red">MID:</p>

            <select
              className="select-player"
              required
              onChange={(e) =>
                setRed((red) => ({ ...red, mid: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <img src="./img/roles/bot.png" className="p-1" height={50} alt="" />
            <p className="ruoli-red">ADC:</p>

            <select
              className="select-player"
              required
              onChange={(e) =>
                setRed((red) => ({ ...red, adc: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <img
              src="./img/roles/support.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-red">SUPP:</p>

            <select
              className="select-player"
              required
              onChange={(e) =>
                setRed((red) => ({ ...red, sup: e.target.value }))
              }
            >
              <option value="">Select player</option>
              {users?.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center w-100 p-4">
          <img src="./img/crown1.png" width={150} alt="" />
          <label className="label-match">MVP</label>
          <select
            className="label-match"
            required
            onChange={(e) => setMVP(e.target.value)}
          >
            <option value="">Select player</option>
            {allowedMVP?.map((user: any) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {allowedMVP.toString()}
          {winner}
          <img src="./img/crown1.png" width={150} alt="" />
        </div>
        <div className="text-center w-100">
          <input type="submit" className="submit-match" value="Submit" />
        </div>
      </form>
      <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>
    </div>
  );
}
