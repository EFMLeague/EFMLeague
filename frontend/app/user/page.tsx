import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function User() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase
    .from("User")
    .select()
    .order("video_source,name", { ascending: true });
  return (
    <div className="index">
      <button className="floating-button">
        <a className="text-decoration-none text-white" href="/">
          HOME
        </a>
      </button>
      <div className="container py-5">
        <div className=" pt-5 d-flex justify-content-center">
          <p
            className="text-black bg-white p-1 m-2 fw-bold fst-italic"
            style={{ fontSize: "3rem" }}
          >
            OUR PLAYERS
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {users?.map((user, index) => (
            <a className="text-white" href={"./user/" + user.name}>
              <div className="mx-auto" key={user.id}>
                <div className="fs-1 fw-bold text-center text-white text-uppercase bg-black">
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
