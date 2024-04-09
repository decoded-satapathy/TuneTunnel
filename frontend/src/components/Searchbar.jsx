import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi"
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from "../redux/features/userSlice";

const Searchbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const dispatch = useDispatch();
  console.log("isLoggedIn : " + isLoggedIn)
  return (

    < form autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600" >
      <div>{isLoggedIn}</div>
      <button onClick={() => {
        isLoggedIn ? dispatch(logout()) : dispatch(login())
      }}>Change it</button>
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row justify-start items-center">

        <FiSearch className="w-5 h-5 ml-4"></FiSearch>
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="text"
          onChange={() => { }}
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
        ></input>

        <button type="button" className="text-white mr-14 md:mr-4 bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 mt-3 border-gray-600 border-2" onClick={() => {
          navigate('/signin');
        }}>Log In</button>
      </div>
    </form >
  )
};

export default Searchbar;
