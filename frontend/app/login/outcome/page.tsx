"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Outcome() {
  const url = "https://efmleague.com/api/auth/riot/oauth2-callback";

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const iss = searchParams.get("iss");
  const session_state = searchParams.get("session_state");

  const getToken = async () => {
    try {
      const res = await fetch(
        url +
          "?" +
          new URLSearchParams({
            code: code as string,
            iss: iss as string,
            session_state: session_state as string,
          })
      );
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  },[]);

  return (
    <div className="text-white text-2xl mt-8">
      {code}
      {iss}
      {session_state}
    </div>
  );
}
