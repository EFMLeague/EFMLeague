// Assicurati che il percorso sia corretto
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import FormWheel from "../components/wheel/formWheel";
import MatchHistory from "../components/tailwind/matchHistory";
import React from "react";
import { getUsersByPuuid } from "../utils/riot/getUsersByPuuid";

export default async function WheelPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: dbUsers } = await supabase
    .from("user_ordered_by_name")
    .select("puuid,video_source,name")
    .neq("name", "FORESTIERO");
  if (!dbUsers) {
    return;
  }
  const users = await getUsersByPuuid(dbUsers);

  return (
    <div className="container mx-auto">
      <p className="text-center text-white text-[4rem] font-bold uppercase">
        Wheel of Fortune
      </p>
      <FormWheel data={users} />
    </div>
  );
}
