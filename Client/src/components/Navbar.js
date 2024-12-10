import React from "react";
import menu from "../images/menu.png";
import gps from "../images/gps.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import arrow from "../images/arrow.png";

import crossbl from "../images/crossbl.png";
const Navbar = () => {
  const [menus, setMenus] = useState(menu);
  const [profile, setProfile] = useState({ display: "none" });
  const handeldiv = () => {
    if (menus == menu) {
      setMenus(crossbl);
      setProfile({ display: "flex" });
    } else {
      setProfile({ display: "none" });

      setMenus(menu);
    }
  };
  return (
    <div className="w-full">
      <nav className="py-4 px-2 relative w-full flex mb-4 items-center justify-between ">
        <div className="flex items-center gap-1 font-bold text-2xl  ">
          <img src={gps} alt="" className="size-6" />
          <p>
            <span className="text-[rgb(245,41,40)] font-bold">Fast</span> Food
          </p>
        </div>
        <div
          onClick={handeldiv}
          className="p-2  bg-[rgb(255,244,227)] rounded-full"
        >
          <img src={menus} alt="" className="size-7" />
        </div>
        <div
          style={profile}
          className="w-full lg:w-[300px] md:w-[300px] z-10 hidden flex-col p-1 py-5 h-auto border-3 shadow-sm shadow-black bg-[rgb(255,234,208)] rounded-tl-xl rounded-b-xl border-red-800  absolute  top-[100%] right-0 "
        >
          <NavLink
            to="/"
            className={(e) => {
              return e.isActive
                ? "p-5 w-ful bg-white flex active:bg-slate-50 justify-between"
                : "p-5 w-full hover:bg-white flex active:bg-slate-50 justify-between";
            }}
          >
            <span>Home</span> <img src={arrow} alt="" />
          </NavLink>
          <NavLink
            to="/Signup"
            className={(e) => {
              return e.isActive
                ? "p-5 w-ful bg-white flex active:bg-slate-50 justify-between"
                : "p-5 w-full hover:bg-white flex active:bg-slate-50 justify-between";
            }}
          >
            <span>Sign Up</span> <img src={arrow} alt="" />
          </NavLink>
          <NavLink
            to="/Login"
            className={(e) => {
              return e.isActive
                ? "p-5 w-ful bg-white flex active:bg-slate-50 justify-between"
                : "p-5 w-full hover:bg-white flex active:bg-slate-50 justify-between";
            }}
          >
            <span>Login</span> <img src={arrow} alt="" />
          </NavLink>

          {/* <div onClick={handeldiv} className="h-[65vh]  bg-transparent  backdrop-blur-md w-full"></div> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
