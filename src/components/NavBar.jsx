// import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch(); // to dispatch the action
  const navigate = useNavigate();


  const handleLogout = async() => {
    try{
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      )
      dispatch(removeUser());
      return navigate("/login");
    }
    catch(error){ 
      console.error("Error logging out:", error);
    }
  }


  return (
     <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            DevCon
          </Link>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user&&(
            <>
              <li>
                <Link to="/connections">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests">
                  Requests
                </Link>
              </li>
            </>)}
            
          </ul>
        </div>
        {user && (<div className="flex gap-2">
          {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
          {/* for user photo */}
          <div className="form-control my-2">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 flex">
            
            {/* <p className="px-4">Welcome, {user.firstName}</p> */}
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile Photo"
                  src={user.photoURL} />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/edit" className="justify-between">
                  Profile Edit
                </Link>
              </li>
              <li>
                <Link to="/change-password" className="justify-between">
                  Change Password
                </Link>
              </li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>

        </div>)}
      </div>
  )
}

export default NavBar