"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Outcome() {
  const [outcome, setOutcome] = useState(0);
  const url = "http://local.example.com/api/auth/riot/oauth2-callback";

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
      setOutcome(res.status);
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (outcome === 0)
    return (
      <div className="text-white text-2xl mt-8">
        {code}
        {iss}
        {session_state}
      </div>
    );

  if (outcome === 200)
    return <div className="text-white text-2xl mt-8">Logged</div>;
  if (outcome === 201)
    return <div className="text-white text-2xl mt-8">Registered</div>;
  return <div>Error</div>;
}
