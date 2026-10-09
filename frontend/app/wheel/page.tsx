import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import FormWheel from "../components/wheel/formWheel";
import React from "react";

export default async function WheelPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: users, error } = await supabase
    .from("user")
    .select("id,name,banner_source")
    .neq("name", "FORESTIERO")
    .order("name");
  if (error) throw new Error(`Errore lettura user: ${error.message}`);

  return (
    <div className="container mx-auto">
      <p className="text-center text-white text-[4rem] font-bold uppercase">
        Wheel of Fortune
      </p>
      <FormWheel data={users} />
    </div>
  );
}
