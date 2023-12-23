import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const checkLinkedToLoL = async (uid_firebase: string) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const res = await supabase
    .from("User")
    .select()
    .eq("id_firebase", uid_firebase);
  console.log(res);
};
