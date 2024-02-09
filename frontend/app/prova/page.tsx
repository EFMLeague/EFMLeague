"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Contatti from "../components/pages/contatti";
import Team from "../components/pages/team";
import { Application } from "@splinetool/runtime";
import Spline from "@splinetool/react-spline";

// const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/vvBSJZJpjFpcIdpB/scene.splinecode');

export default function page() {
  return (
    <div className=" min-h-screen bg-black ">
      <Spline scene="https://prod.spline.design/vvBSJZJpjFpcIdpB/scene.splinecode"></Spline>
    </div>
  );
}
