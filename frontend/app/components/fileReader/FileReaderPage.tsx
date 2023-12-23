"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import SelectChamp from "../selectChamp/selectChamp";

export default function FileReaderPage({
  users,
  allChamps,
  drafts,
}: {
  users: any;
  allChamps: any;
  drafts: any;
}) {
  const [fileContent, setFileContent] = useState<any>({});
  const [fileName, setFileName] = useState("");
  const [matchName, setMatchName] = useState("");
  const [modeMatch, setModeMatch] = useState("standard");
  const [MVP, setMVP] = useState("");
  const supabase = createClientComponentClient<any>();
  const [draftRoom, setDraftRoom] = useState("");
  const [update, setUpdate] = useState<"updated" | "notUpdated" | "error">(
    "notUpdated"
  );

  const [selectedChampions, setSelectedChampions] = useState({
    blue: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
    },
    red: { 1: "", 2: "", 3: "", 4: "", 5: "" },
  });
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      try {
        // Leggi il contenuto del file
        const content = await file.text();
        // Trova la stringa desiderata all'interno del JSON
        const startIndex = content.indexOf('{"gameLength"');
        const endIndex = content.lastIndexOf('}]"}');

        // Estrai la parte del JSON desiderata
        var jsonString = content.substring(startIndex, endIndex + 4);

        // Elimina tutti i caratteri "\"
        jsonString = jsonString
          .replaceAll(/\\/g, "")
          .replaceAll('"[', "[")
          .replaceAll(']"', "]");
        setFileName(file.name.split(".")[0]);
        // Salva la stringa nella variabile di stato
        setFileContent(JSON.parse(jsonString));
        // Puoi fare qualcos'altro con la stringa, ad esempio visualizzarla nella console
      } catch (error) {
        console.error("Errore durante la lettura del file:", error);
      }
    }
  }, []);

  const findBans = async () => {
    let playedChampsGame: string[] = [];
    await fileContent.statsJson.forEach((element: { SKIN: string }) => {
      playedChampsGame.push(element.SKIN);
    });
    let playedChampsDraft: string[] = [];
    let playedChampsDraftRoom: string[] = [];
    await drafts.forEach((element: any) => {
      playedChampsDraft.push(element.pick_blue.concat(element.pick_red));
      playedChampsDraftRoom.push(element.keyRoom);
    });
    let esito = {
      accuratezza: 0,
      maxAcc: 0,
      maxInd: 0,
    };
    console.log(playedChampsGame);

    for (let i = 0; i < playedChampsDraft.length; i++) {
      for (let n = 0; n < 10; n++) {
        if (
          playedChampsDraft[i].includes(playedChampsGame[n]) ||
          playedChampsDraft[i].includes("")
        ) {
          esito.accuratezza++;
        }
      }

      if (esito.accuratezza > esito.maxAcc) {
        esito.maxInd = i;
        esito.maxAcc = esito.accuratezza;
        esito.accuratezza = 0;
      } else {
        esito.accuratezza = 0;
      }
    }

    if (esito.maxAcc < 8) {
      console.log("nessuna draft corrisponde");
    } else {
      console.log(playedChampsDraft[esito.maxInd]);
      console.log(playedChampsDraftRoom[esito.maxInd]);
      setDraftRoom(playedChampsDraftRoom[esito.maxInd]);
      extractDraft(playedChampsDraftRoom[esito.maxInd]);
    }
  };

  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const extractIdUser = (username: any) => {
    const user = users.find((element: any) => element.username === username);
    if (user) {
      return user.id;
    }
    return 31;
  };

  const extractDraft = (draftRoom: any) => {
    const draft = drafts.find((element: any) => element.keyRoom === draftRoom);
    if (draft) {
      setSelectedChampions({
        blue: {
          1: draft.ban_blue[0],
          2: draft.ban_blue[1],
          3: draft.ban_blue[2],
          4: draft.ban_blue[3],
          5: draft.ban_blue[4],
        },
        red: {
          1: draft.ban_red[0],
          2: draft.ban_red[1],
          3: draft.ban_red[2],
          4: draft.ban_red[3],
          5: draft.ban_red[4],
        },
      });
    } else {
      setSelectedChampions({
        blue: {
          1: "",
          2: "",
          3: "",
          4: "",
          5: "",
        },
        red: {
          1: "",
          2: "",
          3: "",
          4: "",
          5: "",
        },
      });
    }
  };

  const extractRole = (role: string) => {
    switch (role) {
      case "JUNGLE":
        return "jng";
        break;
      case "TOP":
        return "top";
        break;
      case "MIDDLE":
        return "mid";
        break;
      case "UTILITY":
        return "sup";
        break;
      case "BOTTOM":
        return "adc";
        break;
    }
  };

  const setInfoGame = async (
    fileName: any,
    fileContent: any,
    matchName: string,
    MVP: string
  ) => {
    millisToMinutesAndSeconds(fileContent.gameLength);
    const date = new Date();
    const res = await supabase
      .from("Match")
      .insert({
        name: matchName,
        date: date,
        duration: millisToMinutesAndSeconds(fileContent.gameLength),
        fileID: fileName,
        banRED: [
          selectedChampions.red[1],
          selectedChampions.red[2],
          selectedChampions.red[3],
          selectedChampions.red[4],
          selectedChampions.red[5],
        ],
        banBLUE: [
          selectedChampions.blue[1],
          selectedChampions.blue[2],
          selectedChampions.blue[3],
          selectedChampions.blue[4],
          selectedChampions.blue[5],
        ],
        mode: modeMatch,
      })
      .select();
    if (res.data === null) {
      return;
    }
    const idMatch = res.data[0].id;

    if (res.status === 201 && res.data) {
      await Promise.all(
        fileContent.statsJson.map(async (element: any) => {
          const hasPlayedInsertResult = await supabase
            .from("hasPlayed")
            .insert({
              rUser: extractIdUser(element.NAME),
              rMatch: idMatch,
              team: element.TEAM === "200" ? "red" : "blue",
              role: extractRole(element.TEAM_POSITION),
              hasWon: element.WIN === "Win" ? true : false,
              champPlayed: element.SKIN,
              kill: element.CHAMPIONS_KILLED,
              death: element.NUM_DEATHS,
              assist: element.ASSISTS,
              mvp:
                extractIdUser(element.NAME).toString() === MVP ? true : false,
              items: [
                element.ITEM0,
                element.ITEM1,
                element.ITEM2,
                element.ITEM3,
                element.ITEM4,
                element.ITEM5,
                element.ITEM6,
              ],
              level: element.LEVEL,
              farm:
                Number(element.MINIONS_KILLED) +
                Number(element.NEUTRAL_MINIONS_KILLED),
              vision: element.VISION_SCORE,
              gold: element.GOLD_EARNED,
            })
            .select();
          console.log(hasPlayedInsertResult);
          if (hasPlayedInsertResult.status === 201) {
            setUpdate("updated");
          } else {
            setUpdate("error");
            return;
          }
        })
      );
    }
    return <></>;
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const insertData = () => {
    setInfoGame(fileName, fileContent, matchName, MVP);
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <div>
          <label className="text-[1.5rem] font-bold pr-2">MATCH NAME:</label>
          <input
            type="text"
            className="border"
            required
            onChange={(e) => setMatchName(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center">
          <label className="text-[2rem] font-bold text-black">MVP: </label>
          <select
            className="mt-2 mx-2"
            required
            onChange={(e) => setMVP(e.target.value)}
          >
            <option value="">Select player</option>
            {fileContent.statsJson?.map((user: any) => (
              <option value={extractIdUser(user.NAME)} key={user.PUUID}>
                {user.NAME}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center">
          <label className="text-[2rem] font-bold text-black">Modalità:</label>
          <select
            className="mt-2 mx-2"
            required
            onChange={(e) => setModeMatch(e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="wheel">Ruota</option>
            <option value="freeRoam">FreeRoam</option>
            <option value="nicozDraft">NicozDraft</option>
            <option value="tournament">Torneo</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <label className="text-[2rem] font-bold text-black">Ban: </label>
        <select
          className="mt-2 mx-2"
          required
          onChange={(e) => {
            extractDraft(e.target.value), setDraftRoom(e.target.value);
          }}
        >
          <option value="">Select draft</option>
          {drafts.map((draft: any) => (
            <option value={draft.keyRoom} key={draft.keyRoom}>
              {draft.keyRoom}
            </option>
          ))}
        </select>
      </div>
      <div className="m-4 flex justify-center items-center flex-col">
        <div {...getRootProps()} style={dropzoneStyles}>
          <input {...getInputProps()} />
          {fileName === "" ? (
            <p>
              Trascina e rilascia un file qui o clicca per selezionare un file
            </p>
          ) : (
            <p>{fileName}</p>
          )}
        </div>
        <button
          className={
            "border-4 font-bold border-black rounded-md p-4 my-5 hover:cursor-pointer bg-green-100 font-body hover:shadow-inner shadow-lg " +
            (update === "updated"
              ? "bg-green-200 "
              : update === "error"
              ? "bg-red-200"
              : "bg-yellow-200")
          }
          onClick={insertData}
        >
          {update === "updated"
            ? "Partita inserita"
            : update === "error"
            ? "qualcosa è andato storto"
            : "Inserisci partita"}
        </button>

        <button
          className={
            "border-4 font-bold border-black rounded-md p-4 my-5 hover:cursor-pointer bg-green-100 font-body hover:shadow-inner shadow-lg "
          }
          onClick={findBans}
        >
          cerca i ban
        </button>
      </div>
      <div className="flex justify-between flex-wrap">
        <div>
          <p className="text-center font-bold text-xl">BAN RED TEAM</p>
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="red"
            order={1}
          />
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="red"
            order={2}
          />
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="red"
            order={3}
          />
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="red"
            order={4}
          />
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="red"
            order={5}
          />
        </div>
        <div>
          <p className="text-center font-bold text-xl">BAN BLUE TEAM</p>
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="blue"
            order={1}
          />
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="blue"
            order={2}
          />
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="blue"
            order={3}
          />
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="blue"
            order={4}
          />
          <SelectChamp
            championData={allChamps}
            setSelectedChampion={setSelectedChampions}
            selectedChampion={selectedChampions}
            team="blue"
            order={5}
          />
        </div>
      </div>
    </div>
  );
}

const dropzoneStyles: React.CSSProperties = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  width: 300,
};
