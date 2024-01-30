"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

export default function Outcome() {
  const [outcome, setOutcome] = useState(0);
  const url = process.env.NEXT_PUBLIC_RIOT_OAUTH2_CALLBACK;
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const iss = searchParams.get("iss");
  const session_state = searchParams.get("session_state");
  const router = useRouter();

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

  useEffect(() => {
    if (outcome === 200) {
      router.refresh();
      const timeoutId = setTimeout(() => {
        window.history.replaceState(null, "", "/");
        window.location.assign("http://local.example.com/");
      }, 2000);

      // Pulisci il timeout quando il componente viene smontato o quando outcome cambia
      return () => clearTimeout(timeoutId);
    }
  }, [outcome]);

  if (outcome === 0)
    return (
      <button type="button" className="bg-indigo-500 ..." disabled>
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
        Processing...
      </button>
    );
  if (outcome === 200)
    return <div className="text-white text-2xl mt-8">Logged</div>;
  if (outcome === 201)
    return <div className="text-white text-2xl mt-8">Registered</div>;
  return <div>Error</div>;
}
