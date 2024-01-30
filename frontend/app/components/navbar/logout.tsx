"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>({ undefined });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://local.example.com/api/auth/riot/getSession"
      );
      // Gestisci i dati res come necessario
      const me = await res.json();
      setSession(me.me);
    } catch (error) {
      setSession(undefined);
      console.error("Errore durante il recupero dei dati:", error);
    }
    setLoading(false);
  };

  const deleteData = async () => {
    try {
      const res = await fetch("http://local.example.com/api/auth/riot/logOut");
      if (res.status === 200) {
        setSession(undefined);
      }
    } catch (error) {
      console.error("Errore durante il recupero dei dati:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (session === undefined) {
    return <Link href="/login">LOGINz</Link>;
  } else {
    return (
      <div className="text-white text-center">
        {session.gameName != undefined && !loading ? (
          <div onClick={deleteData}>LOGOUT</div>
        ) : (
          <button type="button" className="bg-indigo-500 ..." disabled>
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            ></svg>
            Processing...
          </button>
        )}
      </div>
    );
  }
}
