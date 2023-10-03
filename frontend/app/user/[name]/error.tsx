"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      <div className="bg-black/80 w-1/2 p-10 rounded-md flex flex-col justify-center items-center border-2 border-white ">
        <h2 className="text-white text-4xl font-bold text-center">
          Utente non trovato
        </h2>
        <a
          href="/user"
          className="border bg-red-400 text-3xl uppercase text-center w-1/3 font-bold p-4 rounded-md my-6 hover:bg-red-700"
        >
          Torna indietro
        </a>
      </div>
    </div>
  );
}
