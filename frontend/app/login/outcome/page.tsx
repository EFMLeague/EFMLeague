"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function Outcome() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessCode = searchParams.get("code");

  if (!accessCode) router.push("/login");

  const getToken = async () => {
    try {
      const api = "https://www.efmleague.com/api/auth/riot/oauth2-callback";
      const tokens = await axios.get(api, {
        params: {
          code: accessCode,
        },
      });

      console.log(tokens.data);
      return tokens.data;
    } catch (error) {
      console.log(error);

      return { error };
    }
  };
  getToken();

  return <div></div>;
}
