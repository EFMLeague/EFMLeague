import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  var accessCode = req.nextUrl.searchParams.get("code");
  const appCallbackUrl= "https://www.efmleague.com/api/auth/riot/oauth2-callback"
  const tokenUrl="https://auth.riotgames.com/token"
  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(process.env.RIOT_AUTH_CLIENT_ID + ":" + process.env.RIOT_AUTH_CLIENT_SECRET),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: accessCode,
        redirect_uri: appCallbackUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Errore nella richiesta");
    }

    const data = await response.json();
    console.log("OK");
    
    console.log(data);
    
    return NextResponse.json({data}, {status:200})
    console.log(data);
  } catch (error) {
    // Gestisci l'errore
    console.log("ERRORE");
    
    console.log(error);

    return NextResponse.json({error}, {status:500})
    
  }
}
