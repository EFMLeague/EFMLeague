import { getMe } from "@/app/utils/riot/getMe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const accessCode = req.nextUrl.searchParams.get("code") as string;

  const appCallbackUrl = "http://local.example.com/login/outcome";
  const tokenUrl = "https://auth.riotgames.com/token";
  const formData = new URLSearchParams();
  formData.append("grant_type", "authorization_code");
  formData.append("code", accessCode as string);
  formData.append("redirect_uri", appCallbackUrl);
  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      body: formData,
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.RIOT_AUTH_CLIENT_ID +
              ":" +
              process.env.RIOT_AUTH_CLIENT_SECRET
          ).toString("base64"),
      },
    });
    //Autenticazione completata e token ricevuto
    const tokens = await response.json();

    //Richiesta account tramite token di accesso
    const me = await getMe(tokens.access_token);

    //Controllo supabase se contiene un utente con il puuid appena ottenuto da getMe()
    const { data: users } = await supabase
      .from("User")
      .select()
      .eq("puuid", me.puuid);

    if (users && users.length > 0)
      // Esiste utente nel database
      return NextResponse.json({ token: tokens, me }, { status: 200 });
    // Non esiste utente nel database
    // Creazione
    else {
      const res = await supabase
        .from("User")
        .insert({
          name: me.gameName,
          puuid: me.puuid,
          warnings: 0,
          video_source: null,
          role: 2,
          username: me.gameName,
        })
        .select();
      return NextResponse.json({ token: tokens, me }, { status: 201 });
    }

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
