import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { getUsersByPuuid } from "../utils/riot/getUsersByPuuid";
import SelectUser from "../components/selectUser/selectUser";

export default async function User() {
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
    <div className="">
      <div className="container mx-auto">
        <Suspense fallback={<p className="bg-red-600">Loading USERS</p>}>
          <SelectUser users={users}></SelectUser>
        </Suspense>
      </div>
    </div>
  );
}
