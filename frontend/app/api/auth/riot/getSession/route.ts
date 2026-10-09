import { getMe } from "@/app/utils/riot/getMe";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("TOKENRIOT");
  if (token !== undefined) {
    const res = await getMe(token.value);
    return NextResponse.json({ token: token, me: res }, { status: 200 });
  } else {
    return NextResponse.json({ status: 401 });
  }
}
