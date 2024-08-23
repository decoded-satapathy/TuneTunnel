import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom"


export default function Sidebar() {
  return (
    <div className='bg-black h-[500px] mt-[9rem] w-[75px] -ml-4 fixed rounded-[20px]' >
      <ul className='text-white flex -rotate-90 gap-10 text-lg cursor-pointer' >
        <Link to={"/top-charts"} className='mt-6 -ml-[21rem]'>
          <li className='hover:text-red-600'>Top Charts</li>
        </Link>
        <Link to={"/artist"}>
        <li className='mt-6 hover:text-red-600'>Artists</li>
        </Link>
        <Link to={"/"}>
          <li className='mt-6 hover:text-red-600 '>Discover</li>
        </Link>
      </ul>
    </div>
  )
}


