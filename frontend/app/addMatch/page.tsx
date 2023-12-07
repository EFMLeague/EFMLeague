import React from "react";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getAllChamps } from "../utils/riot/getAllChamps";
import FileReaderPage from "../components/fileReader/FileReaderPage";
import UpdateUsername from "../components/updateUsername/updateUsername";
import { getUsersByPuuid } from "../utils/riot/getUsersByPuuid";

export default async function addMatch() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase.from("user_ordered_by_name").select();
  const { data: usersProva } = await supabase.from("User").select();
  const allChamps = await getAllChamps();
  if (users === null) {
    return;
  }
  const usersDB = await getUsersByPuuid(users);
  return (
    <div className="bg-white container mx-auto p-2">
      <p className="text-4xl pt-4 text-center font-bold">AGGIUNGI MATCH</p>
      {/* <FormMatch users={users} allChamps={allChamps} /> */}
      <FileReaderPage users={usersProva} allChamps={allChamps}></FileReaderPage>
      <div className="text-center">
        <UpdateUsername users={usersDB}></UpdateUsername>
      </div>
    </div>
  );
}
