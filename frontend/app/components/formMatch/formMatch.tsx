"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FormSelectUsers from "./formSelectUsers";
import SelectChamp from "../selectChamp/selectChamp";

type Trole = "top" | "jng" | "mid" | "adc" | "sup";

export default function FormMatch({
  users,
  allChamps,
}: {
  users: any;
  allChamps: any;
}) {
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

  const [winner, setWinner] = useState<"blue" | "red">("blue");
  const [MVP, setMVP] = useState("");

  const [selectedChampions, setSelectedChampions] = useState({
    blue: {
      top: "",
      jng: "",
      mid: "",
      adc: "",
      sup: "",
    },
    red: { top: "", jng: "", mid: "", adc: "", sup: "" },
  });

  const handleChangeWinner = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWinner(
      e.target.value === "blue" || e.target.value === "red"
        ? e.target.value
        : "red"
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await supabase
      .from("Match")
      .insert({ name: matchName, date: matchDate })
      .select();
    if (res.status === 201 && res.data) {
      var results: any[];
      Object.entries(blue).forEach(async ([role, id], index) =>
        supabase
          .from("hasPlayed")
          .insert({
            rUser: id,
            rMatch: res.data[0].id,
            team: "blue",
            role: role,
            mvp: id === MVP,
            hasWon: winner === "blue",
            champPlayed: (selectedChampions as any)["blue"][role],
          })
          .select()
      );
      Object.entries(red).forEach(
        async ([role, id], index) =>
          await supabase
            .from("hasPlayed")
            .insert({
              rUser: id,
              rMatch: res.data[0].id,
              team: "red",
              role: role,
              mvp: id === MVP,
              hasWon: winner === "red",
              champPlayed: (selectedChampions as any)["red"][role],
            })
            .select()
      );
    }

    console.log(res);
  };

  return (
    <div>
      <p className="font-bold text-white text-center bg-black overflow-hidden text-[3rem] whitespace-pre w-full">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>

      <form className="" onSubmit={(e) => handleSubmit(e)}>
        <p className="bg-black text-white text-[3.3rem] font-bold text-center">
          MATCH
        </p>
        <div className="w-100 bg-white min-h-[400px] flex flex-col justify-evenly p-4">
          <div className=" flex justify-evenly flex-wrap">
            <label className="text-[1.5rem] font-bold pr-2">MATCH NAME:</label>
            <input
              type="text"
              className="border"
              required
              onChange={(e) => setMatchName(e.target.value)}
            />
            <label className="text-[1.5rem] font-bold pr-2">
              DAY OF THE MATCH:
            </label>
            <input
              type="datetime-local"
              className="border"
              required
              onChange={(e) => setMatchDate(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center w-100">
            <img src="./img/trofeo.png" className="max-h-[100px]" alt="" />
            <label className="text-[1.5rem] font-bold pr-3">WINNERS</label>
            <select
              className="p-3 border"
              required
              onChange={(e) => handleChangeWinner(e)}
            >
              <option value="blue">BLUE</option>
              <option value="red">RED</option>
            </select>
            <img src="./img/trofeo.png" className="max-h-[100px]" alt="" />
          </div>
        </div>
        <div className="flex w-full flex-wrap">
          <div className="bg-blue-500 basis-full lg:basis-1/2">
            <p className="text-white text-[3rem] font-bold text-center">
              TEAM BLUE
            </p>
            <div className="flex items-center py-5">
              <img src="./img/roles/top.png" className="p-1  h-[50px]" alt="" />
              <p className="text-[2rem] font-bold">TOP:</p>
              <select
                className="select-player"
                required
                onChange={(e) =>
                  setBlue((blue) => ({ ...blue, top: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>

              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="blue"
                role="top"
              />
            </div>

            <div className="flex items-center py-5">
              <img src="./img/roles/jng.png" className=" h-[50px] p-1" alt="" />
              <p className="text-[2rem] font-bold">JUNGLE:</p>

              <select
                className="select-player"
                required
                onChange={(e) =>
                  setBlue((blue) => ({ ...blue, jng: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>
              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="blue"
                role="jng"
              />
            </div>
            <div className="flex items-center py-5">
              <img src="./img/roles/mid.png" className=" h-[50px] p-1" alt="" />
              <p className="text-[2rem] font-bold">MID:</p>

              <select
                className="select-player"
                required
                onChange={(e) =>
                  setBlue((blue) => ({ ...blue, mid: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>
              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="blue"
                role="mid"
              />
            </div>
            <div className="flex items-center py-5">
              <img src="./img/roles/adc.png" className=" h-[50px] p-1" alt="" />
              <p className="text-[2rem] font-bold">ADC:</p>

              <select
                className="select-player"
                required
                onChange={(e) =>
                  setBlue((blue) => ({ ...blue, adc: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>
              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="blue"
                role="adc"
              />
            </div>
            <div className="flex items-center py-5">
              <img src="./img/roles/sup.png" className=" h-[50px] p-1" alt="" />
              <p className="text-[2rem] font-bold">SUPP:</p>

              <select
                className="select-player"
                required
                onChange={(e) =>
                  setBlue((blue) => ({ ...blue, sup: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>
              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="blue"
                role="sup"
              />
            </div>
          </div>
          <div className="basis-full bg-red-500 lg:basis-1/2">
            <p className="text-white text-[3rem] font-bold text-center">
              TEAM RED
            </p>
            <div className="flex items-center py-5">
              <img src="./img/roles/top.png" className=" h-[50px] p-1" alt="" />
              <label className="text-[2rem] font-bold">TOP:</label>
              <select
                className="select-player"
                required
                onChange={(e) =>
                  setRed((red) => ({ ...red, top: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>
              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="red"
                role="top"
              />
            </div>
            <div className="flex items-center py-5">
              <img src="./img/roles/jng.png" className=" h-[50px] p-1" alt="" />
              <label className="text-[2rem] font-bold">JUNGLE:</label>

              <select
                className="select-player"
                required
                onChange={(e) =>
                  setRed((red) => ({ ...red, jng: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>
              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="red"
                role="jng"
              />
            </div>
            <div className="flex items-center py-5">
              <img src="./img/roles/mid.png" className=" h-[50px] p-1" alt="" />
              <label className="text-[2rem] font-bold">MID:</label>

              <select
                className="select-player"
                required
                onChange={(e) =>
                  setRed((red) => ({ ...red, mid: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>
              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="red"
                role="mid"
              />
            </div>
            <div className="flex items-center py-5">
              <img src="./img/roles/adc.png" className=" h-[50px] p-1" alt="" />
              <label className="text-[2rem] font-bold">ADC:</label>

              <select
                className="select-player"
                required
                onChange={(e) =>
                  setRed((red) => ({ ...red, adc: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>
              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="red"
                role="adc"
              />
            </div>
            <div className="flex items-center py-5">
              <img src="./img/roles/sup.png" className=" h-[50px] p-1" alt="" />
              <label className="text-[2rem] font-bold">SUPP:</label>

              <select
                className="select-player"
                required
                onChange={(e) =>
                  setRed((red) => ({ ...red, sup: e.target.value }))
                }
              >
                <FormSelectUsers
                  users={users}
                  red={red}
                  blue={blue}
                  mode="exclude"
                />
              </select>
              <SelectChamp
                championData={allChamps}
                setSelectedChampion={setSelectedChampions}
                selectedChampion={selectedChampions}
                team="red"
                role="sup"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-100 p-4 bg-white">
          <img src="./img/crown1.png" width={150} alt="" />
          <label className="text-[2rem] font-bold text-black">MVP</label>
          <select
            className="label-match"
            required
            onChange={(e) => setMVP(e.target.value)}
          >
            <option value="">Select player</option>
            {users?.map((user: any) =>
              (winner === "blue" &&
                Object.values(blue).includes(String(user.id))) ||
              (winner === "red" &&
                Object.values(red).includes(String(user.id))) ? (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ) : null
            )}
          </select>
          <img src="./img/crown1.png" width={150} alt="" />
        </div>
        <div className="text-center w-100 bg-white py-4">
          <input
            type="submit"
            className="bg-black text-white text-[2rem] p-4"
            value="Submit"
          />
        </div>
      </form>
      <p className="font-bold text-white text-center bg-black overflow-hidden text-[3rem] whitespace-pre w-full">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>
    </div>
  );
}
