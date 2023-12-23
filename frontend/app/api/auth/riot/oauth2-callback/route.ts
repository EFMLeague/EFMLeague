import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessCode = req.nextUrl.searchParams.get("code") as string;

  const appCallbackUrl = "https://www.efmleague.com/login/outcome";
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
    const tokens = await response.json();
    console.log(tokens);

    return NextResponse.json({ token: tokens }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
