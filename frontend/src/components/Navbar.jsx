import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar is-fixed-top has-shadow p-2"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand pt-3">
        <NavLink className="navbar-item" to={"/dashboard"}>
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Logo bulma"
          />
        </NavLink>

        <a
          href="!#"
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-primary">
                <strong>Log out</strong>
              </button>
              <button className="button is-light">Log in</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
