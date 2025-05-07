import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../redux/constants.js";
import { addUser } from "../redux/userSlice.js";

const ProtectedRoutes = ({ path, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    // If user exists and tries to access login/signup, redirect to home
    
    if (user) {
      if (path === "/login") {
        navigate("/");
      }
      if (path === "/signup") {
        navigate("/profile");
      }
      return;
    }

    // If user already exists and is not on auth route, no need to fetch again
    if (user) return;

    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      const loggedInUser = response?.data?.user;

      if (loggedInUser) {
        dispatch(addUser(loggedInUser));
        navigate(path);
      }
    } catch (error) {
      // Redirect to login if not authorized
      if (error?.status === 401) {
        if (path === "/login" || path === "/signup") {
          navigate(path);
        } else {
          navigate("/login");
        }
      } else {
        console.error("Failed to fetch user:", error.message);
      }
    }
  };

  useEffect(() => {
      fetchUser();
  }, [user, path]);

  return <>{children}</>;
};

export default ProtectedRoutes;
