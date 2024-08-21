import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi"
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from "../redux/features/userSlice";
import { logo } from "../assets";
// import { Link } from "react-router-dom";

const Searchbar = () => {
  useEffect(() => { console.log("form searchBar component") }, [])
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  return (
    < form autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600" >
      
      <div className="flex flex-row justify-between items-center">

       <Link to={"/"}>
       <img src={logo} alt="logo" className="w-[170px] h-32 object-contain"></img>
       </Link>
        <div className='flex w-[50%] bg-red-600 rounded-[20px]'>
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="text"
          onChange={() => { }}
          className="lex-1 bg-black border-none outline-none placeholder-gray-500 text-base text-white p-2 rounded-[20px] pl-10 w-[95%] ml-1"
        ></input>
        <FiSearch  size={20} className="h-5 ml-2 mr-4 mt-[0.6rem] text-lg text-white "></FiSearch>
        </div>

        {isLoggedIn ? (
          <div className="flex justify-center items-center">
            <button type="button" className="text-white mr-14 md:mr-4 bg-gradient-to-r from-[#1f1e1e] via-[#1f1e1e] to-[#aa3131] hover:bg-gradient-to-r hover:from-[#aa3131] hover:via-[#1f1e1e] hover:to-[#1f1e1e] font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 mt-3 border-2 border-gray-600"
              onClick={() => {
                dispatch(logout());
                localStorage.setItem('token', null)
                navigate('/signin');
              }}>Log Out</button>


            <div className="relative inline-flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 border-2 border-gray-600 overflow-hidden bg-gradient-to-br from-red-600 to-black rounded-full ">
              <span className="font-medium text-gray-600 dark:text-gray-300">{name.split("")[0]}</span>
            </div>
          </div>
        ) :

          <button type="button" className="text-white mr-14 md:mr-4 bg-gradient-to-r from-[#1f1e1e] via-[#1f1e1e] to-[#aa3131] hover:bg-gradient-to-r hover:from-[#aa3131] hover:via-[#1f1e1e] hover:to-[#1f1e1e] font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 mt-3 border-2 border-gray-600"
            onClick={() => {
              navigate('/signin');
            }}>Log In</button>
        }
      </div>
    </form >
  )
};

export default Searchbar;
