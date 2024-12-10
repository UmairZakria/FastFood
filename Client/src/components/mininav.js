import React from "react";
import { NavLink } from "react-router-dom";
const Mininav = () => {
  return (
    <div>
      <nav className="w-full rounded-2xl  shadow-md shadow-gray-400 box-border flex justify-around">
        <NavLink to="/Login"  className={(e) =>{return e.isActive?"px-7 font-bold border-b-[3px] border-[red] py-4 ":"px-7 font-bold  py-4"} } >
          Login
        </NavLink>
        <NavLink to="/Signup" className={(e) =>{return e.isActive?"px-7 font-bold border-b-[3px] border-[red] py-4 ":"px-7 font-bold  py-4"} } >
          Signup
        </NavLink>
      </nav>
    </div>
  );
};

export default Mininav;
