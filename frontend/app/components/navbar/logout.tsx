import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Logout() {
  const [session, setSession] = useState<any>();
  async function mySession() {
    const session = await getSession();
    setSession(session);
  }

  useEffect(() => {
    mySession();
  }, []);

  if (session)
    return (
      <div className="text-white text-sm text-center">
        {session.user?.name}.
        <br className="lg:hidden" />
        <a href="/api/auth/signout" className="underline">
          Logout
        </a>
      </div>
    );
  else return null
}
