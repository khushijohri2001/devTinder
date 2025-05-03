import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/userSlice";
import {axios} from "axios";
import {BASE_URL} from "../redux/constants"

const Navbar = () => {
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch()

  const logoutHandler = async () => {
   try {
    await axios.post( BASE_URL+ "/logout", {}, {
      withCredentials: true
     })
     dispatch(removeUser())
   } catch (error) {
    console.error(error.message);
    
   }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Star Tribe</a>
      </div>

      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end ">
            <div className="flex items-center gap-4">

              <p>Welcome, {user.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mr-8"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>

            </div>

            {/* Dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={logoutHandler}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn">Sign up</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
