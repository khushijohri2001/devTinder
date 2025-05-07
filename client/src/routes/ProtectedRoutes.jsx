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
    if (user) {
      // Redirect logged-in users away from login page
      if (path === "/login") {
        navigate("/");
      }
      return;
    }

    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      const loggedInUser = response?.data?.user;

      dispatch(addUser(loggedInUser));
      navigate(path);
    } catch (error) {
      // Redirect to login if not authorized
      if (error?.response?.status === 401) {
        navigate("/login");
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
