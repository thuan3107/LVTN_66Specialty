import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ active }) => {
  return (
    <div className="  h-[120px]  mt-[70px] flex justify-center text-xl bg-white-400 items-center">
      {navItems &&
        navItems.map((i, index) => (
          <Link
            to={i.url}
            className={`${
              active === index + 1
                ? "  bg-[#008848]  text-white hover:no-underline"
                : "black hover:no-underline"
            } flex  h-[50%]  w-[13%]  p-2 border  rounded-lg m-2 mb-4  justify-center items-center`}
          >
            <div className=" no-underline  pb-[30px]  800px:pb-0 font-[500] pxy-10 cursor-pointer">
              <a href="" className="hover:no-underline">
                {i.title}{" "}
              </a>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Navbar;
