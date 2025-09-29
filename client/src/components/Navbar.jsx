import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/userSlice";
import axios from "axios";
import { BASE_URL } from "../redux/constants";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((store) => store);
  const { firstName, photoUrl } = user ?? "";
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <div className="navbar bg-base-300 shadow-sm sticky top-0 z-40">
      <div className="flex-1">
        <Link to="/">
          <p className="btn btn-ghost text-xl">Star Tribe</p>
        </Link>
      </div>

      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end ">
            <div className="flex items-center gap-4">
              <p>Hey, Welcome {firstName}!</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mr-8"
              >
                <div className="w-10 rounded-full">
                  <img alt={firstName} src={photoUrl} />
                </div>
              </div>
            </div>

            {/* Dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/profile">
                 Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/connections">
                  My Connections
                </NavLink>
              </li>
              <li>
                <NavLink to="/inbox">
                  Inbox
                </NavLink>
              </li>
              <li>
                <NavLink to="/pending-requests">
                  Pending Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/upgrade-plans">
                  Upgrade Plans
                </NavLink>
              </li>
              <li onClick={logoutHandler}>
                <p>Logout</p>
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
