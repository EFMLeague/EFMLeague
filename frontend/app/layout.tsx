import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import Navbar from "./components/navbar/navbar";
export const revalidate = 0;
// export const dynamic = "force-static";
const decaloType = localFont({
  src: [
    {
      path: "./utils/font/decalotype.regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./utils/font/decalotype.bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./utils/font/decalotype.bold-italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./utils/font/decalotype.italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "EFMLeague",
  description: "Created by Francesco Nicolo & Stefano Piccoli",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={decaloType.className}>
        <div className="pb-14">
          <div className="h-screen w-screen -z-10 fixed ">
            <img
              src="../img/banner.jpg"
              className="object-cover h-full w-full"
              alt=""
            />
            <div className="overlay"></div>
          </div>
        </div>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
