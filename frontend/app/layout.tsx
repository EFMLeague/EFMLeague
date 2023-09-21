import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import Navbar from "./components/navbar/navbar";

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
export const dynamic = "force-dynamic";
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
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      </head>
      <body className={decaloType.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
