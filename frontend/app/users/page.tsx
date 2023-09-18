import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase.from("User").select();

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">PUUID</th>
          <th scope="col">name</th>
          <th scope="col">warnings</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{user.puuid}</td>
            <td>{user.name}</td>
            <td>{user.warnings}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
