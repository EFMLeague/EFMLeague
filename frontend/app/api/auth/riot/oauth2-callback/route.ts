import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessCode = req.nextUrl.searchParams.get("code");

  const appCallbackUrl =
    "https://www.efmleague.com/api/auth/riot/oauth2-callback";
  const tokenUrl = "https://auth.riotgames.com/token";
  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code");
    formData.append("code", accessCode as string);
    formData.append("redirect_uri", appCallbackUrl);
    const tokens = await axios.post(tokenUrl, formData, {
      headers: {
        Authorization:
          "Basic " +
          btoa(
            process.env.RIOT_AUTH_CLIENT_ID +
              ":" +
              process.env.RIOT_AUTH_CLIENT_SECRET
          ),
      },
    });

    // if (!response.ok) {
    //   throw new Error("Errore nella richiesta");
    // }

    // const data = await response.json();
    console.log("OK");
    console.log(tokens.data);
    return NextResponse.json({ tokens }, { status: 200 });
  } catch (error) {
    console.log("ERRORE");
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
