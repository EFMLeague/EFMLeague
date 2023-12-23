"use client";
import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    // setError(data.error);
    if (response.status === 201) {
      console.log("created");
    } else {
      setError("Errore: " + data.error.code);
    }
  };

  return (
    <div className="bg-white h-screen text-center pt-4">
      <form action="" onSubmit={(e) => signUP(e)}>
        <label htmlFor="">EMAIL:</label>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setEmail(e.target.value)}
          className="border"
        />
        <br />
        <label htmlFor="">PASSWORD:</label>
        <input
          className="border"
          type="text"
          name=""
          id=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">INVIA</button>
        <p className="text-4xl text-red-500">{error}</p>
      </form>
    </div>
  );
}
