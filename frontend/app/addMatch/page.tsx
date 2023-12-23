import React from "react";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getAllChamps } from "../utils/riot/getAllChamps";
import FileReaderPage from "../components/fileReader/FileReaderPage";
import UpdateUsername from "../components/updateUsername/updateUsername";
import { getUsersByPuuid } from "../utils/riot/getUsersByPuuid";
import UpdateAccount from "../components/UpdateAccount/updateAccount";
import { getAccountsByPuuid } from "../utils/riot/getAccountsByPuuid";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import { checkLinkedToLoL } from "../utils/firebase/checkLinkedToLoL";

export default async function addMatch() {
  const session = await getServerSession(options);
  if (!checkLinkedToLoL(session?.uid)) {
    redirect("/verify-user");
  }

  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase.from("user_ordered_by_name").select();
  const { data: usersProva } = await supabase.from("User").select();
  const allChamps = await getAllChamps();
  const { data: drafts } = await supabase
    .from("Draft")
    .select()
    .eq("registered", false);
  if (users === null) {
    return;
  }

  const usersUpdate = await getUsersByPuuid(users);
  const accountsUpdate = await getAccountsByPuuid(users);

  return (
    <div className="bg-white container mx-auto p-2">
      <p className="text-4xl pt-4 text-center font-bold">AGGIUNGI MATCH</p>
      <FileReaderPage
        users={usersProva}
        allChamps={allChamps}
        drafts={drafts}
      ></FileReaderPage>
      <div className="text-center">
        <UpdateUsername users={usersUpdate}></UpdateUsername>
        <UpdateAccount users={accountsUpdate}></UpdateAccount>
      </div>
    </div>
  );
}
