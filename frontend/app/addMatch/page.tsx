import React from "react";
import FormMatch from "../components/formMatch/formMatch";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function addMatch() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase.from("user_ordered_by_name").select();

  return (
    <div>
      <FormMatch users={users} />
    </div>
  );
}
