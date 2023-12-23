import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase/config";
import { NextRequest, NextResponse } from "next/server";
import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: NextRequest, response: NextResponse) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const data = await request.json();
  try {
    const firebaseUser = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const result = await supabase
      .from("User")
      .insert({
        id_firebase: firebaseUser.user.uid,
        name: firebaseUser.user.email,
        puuid: "",
      });
    console.log(result);
    return new NextResponse(JSON.stringify({ firebaseUser }), { status: 201 });
  } catch (error) {
    // const errorCode = (error as AuthError).code;

    return new NextResponse(JSON.stringify({ error }), { status: 400 });
  }
}

// const checkUser = (account_name: string) => {
//   if (users?.find((e) => e.account_name === account_name)) return true;
//   else return false;
// };

// const playerData = await getAccountByNameTag(data.username);

// if (checkUser(playerData.account_name)) {
//   console.log("utente già registrato");
// const result = await supabase
//   .from("User")
//   .update({
//     id_firebase: firebaseUser.user.uid,
//     account_name: playerData.gameName + "#" + playerData.tagLine,
//     name: playerData.gameName.replace(/ /g, "_"),
//   })
//   .eq("puuid", playerData.puuid);
// } else {
//   const result = await supabase.from("User").insert({
//     id_firebase: firebaseUser.user.uid,
//     puuid: playerData.puuid,
//     account_name: playerData.gameName + "#" + playerData.tagLine,
//     role: 2,
//     video_source: null,
//     warnings: 0,
//     name: playerData.gameName.replace(/ /g, "_"),
//   });
//   if (result.status === 201) {
//     console.log("Registrazione avvenuta con successo");
//   }
// }
// console.log(users);
// return Response.json(firebaseUser.user.uid);
// return;
