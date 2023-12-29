"use client";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Logout() {
  const [session, setSession] = useState<Session | null>();
  useEffect(() => {
    (async function fetchSession() {
      const session = await getSession();
      setSession(session);
    })();
  }, []);

  if (session)
    return (
      <div className="text-white text-sm text-center">
        {session?.user ? (
          <>
            <p>Benvenuto {session.user.email?.split("@")[0]}</p>
            <button onClick={() => signOut()}>Log out</button>
          </>
        ) : (
          <div className="flex">
            <span className="mr-2">Verificando l&apos;accesso</span>
          </div>
        )}
      </div>
    );
  else return null;
}
