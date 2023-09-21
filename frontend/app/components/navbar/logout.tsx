import { options } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth/next";

export default async function Logout() {
  const session = await getServerSession(options);
  if (session)
    return <div className="text-white">Logged as {session.user?.name}. <a href="/api/auth/signout">Logout.</a></div>
  else
    return null
}
