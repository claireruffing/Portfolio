import React from "react";
import { NavLink } from "react-router-dom";
import "./components.css";
import { SocialIcon } from "react-social-icons";

export default function NavBar() {
  return (
    <header class="navbarColor">
      <div className="container mx-auto flex justify-between">
        <nav className="flex">
          <NavLink
            to="/"
            exact
            activeClassName="navbarTextColor"
            className="inflex-flex items-center py-6 px-3 mr-4 hover:underline text-4xl font-bold cursive tracking-widest"
          >
            Home
          </NavLink>
          <NavLink
            to="/post"
            activeClassName="navbarTextColor"
            className="inflex-flex items-center py-3 px-3 my-6 rounded hover:underline font-bold"
          >
            Resume
          </NavLink>
          <NavLink
            to="/project"
            activeClassName="navbarTextColor"
            className="inflex-flex items-center py-3 px-3 my-6 rounded hover:underline font-bold"
          >
            Projects
          </NavLink>
          <NavLink
            to="/about"
            activeClassName="navbarTextColor"
            className="inflex-flex items-center py-3 px-3 my-6 rounded hover:underline font-bold"
          >
            About Me
          </NavLink>
        </nav>
        <div className="inline-flex py-3 px-3 my-6">
          {/* mr-4 is margin right of 4  _blank is to open a blank new page */}
          <SocialIcon
            url="https://github.com/claireruffing/Projects"
            className="mr-4"
            target="_blank"
            fgColor="#fff"
            style={{ height: 35, width: 35 }}
          ></SocialIcon>
          <SocialIcon
            url="https://www.linkedin.com/in/claire-ruffing-018b05175"
            className="mr-4"
            target="_blank"
            fgColor="#fff"
            style={{ height: 35, width: 35 }}
          ></SocialIcon>
        </div>
      </div>
    </header>
  );
}
