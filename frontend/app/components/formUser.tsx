"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";

export default function userForm() {
  const [name, setName] = useState("");
  const [puuid, setPuuid] = useState("");
  const [warnings, setWarnings] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = await supabase
      .from("user_ordered_by_name")
      .insert({ name: name, puuid: puuid, warnings: warnings });
    console.log(error);
  };
  const supabase = createClientComponentClient<any>();

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>puuid</label>
        <input type="text" onChange={(e) => setPuuid(e.target.value)} />
        <label>Warnings</label>
        <input
          type="number"
          onChange={(e) => setWarnings(Number(e.target.value))}
        />
        <input type="submit" value="INVIA" />
      </form>
    </div>
  );
}
