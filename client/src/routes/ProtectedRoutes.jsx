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
      if (path === "/login") {
        navigate("/");
      }
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.user));
      navigate(path);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return <>{children}</>;
};

export default ProtectedRoutes;
