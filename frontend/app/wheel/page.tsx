// Assicurati che il percorso sia corretto
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import FormWheel from "../components/wheel/formWheel";
import MatchHistory from "../components/tailwind/matchHistory";
import React from "react";

export default async function WheelPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase.from("User").select();
  if (!users) {
    return;
  }

  return (
    <div className="container mx-auto">
      <p className="text-center text-white text-[4rem] font-bold uppercase">
        Wheel of Fortune
      </p>
      <FormWheel data={users} />
      {/* <MatchHistory /> */}
    </div>
  );
}
