import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function User() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase
    .from("User")
    .select()
    .order("video_source,name", { ascending: true });
  console.log(users);
  return (
    <div className="">
      <div className="container mx-auto">
        <p className="text-black bg-white p-1 m-2 font-bold text-5xl text-center">
          OUR PLAYERS
        </p>

        <div className="grid grid-cols-4">
          {users?.map((user, index) => (
            <a
              className="col-span-4 m-2 md:col-span-1"
              href={"./user/" + user.name}
            >
              <div className="" key={user.id}>
                <div className="text-4xl font-bold text-center text-white bg-black">
                  {user.name}
                </div>
                <div>
                  {user.video_source ? (
                    <img
                      className="img-card"
                      src={"./img/screenshots/frame_" + user.name + ".jpg"}
                      alt=""
                    />
                  ) : (
                    <img
                      className="img-card"
                      src={"./img/screenshots/frame_intro.jpg"}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
