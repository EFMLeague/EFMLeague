import React from "react";
import Logout from "./logout";
import { SessionProvider } from "next-auth/react";

export default function navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
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
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
              <a className="nav-link" href="/user">
                Users
              </a>
              <a className="nav-link" href="/addMatch">
                Add a match
              </a>
            </div>
          </div>
          <Logout />
        </div>
      </nav>
    </div>
  );
}
