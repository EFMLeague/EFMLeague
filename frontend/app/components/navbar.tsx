"use client";
import React from "react";

export default function navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-black">
        <div className="container">
          <a className="navbar-title" href="#">
            EFM League
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="#">
                Home
              </a>
              <a className="nav-link" href="#">
                Roster
              </a>
              <a className="nav-link" href="#">
                Rankings
              </a>
              <a className="nav-link" href="#">
                Social
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
