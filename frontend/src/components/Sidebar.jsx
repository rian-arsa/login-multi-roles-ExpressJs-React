import React from "react";
import { NavLink } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="menu pl-3 mt-5 has-shadow">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <NavLink to={"/dashboard"}>
            <IoHome />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={"/products"}>
            <IoPricetag />
            Products
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">Administration</p>
      <ul className="menu-list">
        <li>
          <NavLink to={"/users"}>
            <IoPerson />
            Users
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">Setting</p>
      <ul className="menu-list">
        <li>
          <button className="button is-white">
            <IoLogOut />
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
