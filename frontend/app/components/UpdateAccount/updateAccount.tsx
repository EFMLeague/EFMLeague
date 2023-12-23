"use client";

import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

import React, { useState } from "react";

export default function UpdateUsername({ users }: { users: any }) {
  const supabase = createClientComponentClient<any>();
  const [update, setUpdate] = useState<"updated" | "notUpdated" | "error">(
    "notUpdated"
  );

  const updateAccount = (users: any[]) => {
    users.forEach(async (element) => {
      const res = await supabase
        .from("User")
        .update({ account_name: element.gameName + "#" + element.tagLine })
        .eq("puuid", element.puuid);

      if (res.status === 204) {
        setUpdate("updated");
      } else {
        setUpdate("error");
        return;
      }
    });
  };
  return (
    <button
      onClick={() => updateAccount(users)}
      className={
        "p-4 rounded-lg text-lg border border-black hover:shadow-inner shadow-lg " +
        (update === "updated"
          ? "bg-green-200 "
          : update === "error"
          ? "bg-red-200"
          : "bg-yellow-200")
      }
    >
      {update === "updated"
        ? "account aggiornati"
        : update === "error"
        ? "qualcosa è andato storto"
        : "Aggiorna account"}
    </button>
  );
}
