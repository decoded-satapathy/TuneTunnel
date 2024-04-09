import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom"

const NavLinks = () => (
  <div className="mt-10">
    {links.map((item) => (
      <>
        <NavLink
          key={item.name}
          to={item.to}
          className="my-7 flex flex-row justify-start items-center text-md font-medium text-gray-400 hover:text-cyan-400"
          // onClick={() => handleClick && handleClick(item.name)}
          // both the above and below line do the same thing
          onClick={function() {
            if (handleClick) {
              handleClick(item.name);
            }
          }}
        >
          <item.icon className="w-6 h-6 text-white mr-2"></item.icon>
          {item.name}
        </NavLink>
      </>
    ))}
  </div>
);
const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* When you specify md:flex without an explicit md:hidden, Tailwind assumes you want the element to be visible at the md breakpoint and above, regardless of the hidden class. */}
      <div className="hidden md:flex flex-col w-[240px] py-10 px-10 bg-[#191624]">
        <Link to={`/`} className="cursr-pointer">
          <img src={logo} alt="logo" className="w-full h-32 object-contain"></img>
        </Link>
        <NavLinks></NavLinks>
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="cursor-pointer w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          ></RiCloseLine>
        ) : (
          <HiOutlineMenu
            className="cursor-pointer w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          ></HiOutlineMenu>
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-9/12 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-md z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? "left-0 " : "-left-full"
          }`}
      >
        <img src={logo} alt="logo" className="w-full h-32 object-contain"></img>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}></NavLinks>
      </div>
    </>
  );
};

export default Sidebar;
