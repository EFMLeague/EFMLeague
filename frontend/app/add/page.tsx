import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase.from("User").select();
  return (
    <div>
      <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>
      <form className="d-flex flex-wrap w-100">
        <div className="w-100 d-flex justify-content-center position-absolute">
          <p className="bg-dark match-title ">SQUADS</p>
        </div>
        <div className="bg-primary side">
          <p className="team-name text-center">TEAM BLUE</p>

          <div className="line-role-name">
            <p className="ruoli-blue">TOP:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="line-role-name">
            <p className="ruoli-blue">JUNGLE:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <p className="ruoli-blue">MID:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <p className="ruoli-blue">ADC:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <p className="ruoli-blue">SUPP:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
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
            <p className="ruoli-red">TOP:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <p className="ruoli-red">JUNGLE:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <p className="ruoli-red">MID:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <p className="ruoli-red">ADC:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="line-role-name">
            <p className="ruoli-red">SUPP:</p>
            {/* SELECT PER PERSONA */}
            <select className="select-player" aria-label="Select" required>
              <option selected>Select player</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex flex-wrap w-100 bg-white justify-content-center">
          <div className="w-100 d-flex justify-content-center">
            <p className="bg-dark match-title ">MATCH</p>
          </div>
          <div className="input-match">
            <label className="label-match">MATCH NAME:</label>
            <input
              type="text"
              id="matchName"
              name="matchName"
              className="label-match"
            />
          </div>
          <div className="input-match">
            <label className="label-match">DAY OF THE MATCH:</label>
            <input
              type="date"
              id="matchDate"
              name="matchDate"
              className="label-match"
            />
          </div>
          <div className="d-flex justify-content-center align-items-center w-100 p-4">
            <img src="./img/trofeo.png" width={150} alt="" />
            <label className="label-match">WINNERS</label>
            <select className="label-match">
              <option value="blue">BLUE</option>
              <option value="red">RED</option>
            </select>
            <img src="./img/trofeo.png" width={150} alt="" />
          </div>

          <div className="d-flex justify-content-center align-items-center w-100 p-4">
            <img src="./img/crown1.png" width={150} alt="" />
            <label className="label-match">MVP</label>
            <select className="label-match">
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <img src="./img/crown1.png" width={150} alt="" />
          </div>
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
