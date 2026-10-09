import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import SelectUser from "../components/selectUser/selectUser";

export default async function User() {
  const supabase = createServerComponentClient({ cookies });

  const { data: users, error } = await supabase
    .from("user")
    .select("id,name,banner_source")
    .neq("name", "FORESTIERO")
    .order("name");
  if (error) throw new Error(`Errore lettura user: ${error.message}`);

  return (
    <div className="">
      <div className="container mx-auto">
        <Suspense fallback={<p className="bg-red-600">Loading USERS</p>}>
          <SelectUser users={users}></SelectUser>
        </Suspense>
      </div>
    </div>
  );
}
