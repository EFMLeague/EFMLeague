import React from "react";

export default function formSelectUsers({
  users,
  blue,
  red,
  mode,
}: {
  users: any;
  blue?: any;
  red?: any;
  mode?: "exclude" | "include";
}) {
  var sel = (
    <>
      <option>Select player</option>
      {users?.map((user: any) => {
        if (mode === "exclude")
          if (red && blue)
            if (
              !(
                Object.values(blue).includes(String(user.id)) ||
                Object.values(red).includes(String(user.id))
              ) || user.name==='FORESTIERO'
            )
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            else
              return (
                <option hidden value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
      })}
    </>
  );
  return sel;
}