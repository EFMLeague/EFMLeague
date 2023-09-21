import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./components/navbar/navbar";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase
    .from("User")
    .select()
    .order("name", { ascending: true });
  const { data: match } = await supabase.from("Match").select();

  const { data: mostWinningPlayers } = await supabase
    .from("hasPlayed")
    .select()
    .eq("hasWon", true);

  console.log(match?.length);
  console.log(users?.length);
  return (
    <div>
      <div className="index">
        <div className="container">
          <div className=" row hero-area" id="hero-area">
            <div className="col">
              <div className="d-flex flex-column justify-content-center h-100 ">
                <p className="text-hero">
                  <span className="text-primary">NEW</span> COMPETITIVE
                  TOURNAMENT of :<br />
                  <span className="text-primary"> L</span>EAGUE{" "}
                  <span className="text-primary">O</span>F{" "}
                  <span className="text-primary">L</span>EGENDS
                </p>
                <p className="text-base">
                  Born from the idea of some friends and finally become reality,
                  thanks also to the support of foreigners. Place where the
                  tryhard is necessary like discord.
                </p>
              </div>
            </div>
            <div className="col">
              <div className="text-center d-flex justify-content-center align-items-center h-100 py-5 ">
                <img src="./img/logo/Logocentrato.png" height={300} alt="" />
              </div>
            </div>
          </div>
          <div className="py-5"></div>
          <div className="text-center">
            <p className="d-block text-hero ">
              <span className=" p-1">OUR</span>{" "}
              <span className="text-danger p-1">NUMBERS</span>
            </p>
            <div className="d-flex flex-wrap justify-content-center mx-auto">
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">{users?.length}</p>
                <p className="text-base">Subscriber</p>
              </div>
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">{match?.length}</p>
                <p className="text-base">games played</p>
              </div>
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">43</p>
                <p className="text-base">New friends</p>
              </div>
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">12</p>
                <p className="text-base">Match for week</p>
              </div>
              <div className="p-4 text-center mx-auto">
                <p className="text-hero">00</p>
                <p className="text-base">Kicked</p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5" id="roster"></div>
        <div className="container p-4">
          <div className="row">
            <div className="col">
              <p className="d-block text-hero text-center">
                <span className="p-1">OUR</span>{" "}
                <span className="text-primary p-1">RANKINGS</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col col-md-4">
              <div className="row bg-white">
                <div className="col text-center">Most winning player</div>
              </div>
              <div className="row bg-white">
                <div className="col-2">1</div>
                <div className="col">Francesco</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
