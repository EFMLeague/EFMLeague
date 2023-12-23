import React from "react";

export default function Login() {
  const authorizeUrl = "https://auth.riotgames.com/authorize";
  const appCallbackUrl =
    "https://efmleague.com/login/outcome";
  const clientID = "ad73d3e5-099f-4681-adb7-5036f0a6821d";

  const link =
    authorizeUrl +
    "?redirect_uri=" +
    appCallbackUrl +
    "&client_id=" +
    clientID +
    "&response_type=code" +
    "&scope=openid";

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white h-[50rem] w-[30rem] rounded-xl p-8">
        <div className="h-16 bg-red-800 flex justify-center items-center rounded-xl">
          <a href={link} className="text-2xl text-white">
            Login with RIOT Games
          </a>
        </div>
      </div>
    </div>
  );
}
