import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../redux/constants.js";
import { addUser, removeUser } from "../redux/userSlice.js";

const ProtectedRoutes = ({ children, requireAuth }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        
        const response = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });

        const loggedInUser = response?.data?.user;

        if (loggedInUser) {
          dispatch(addUser(loggedInUser));
        } else {
          dispatch(removeUser());
        }

        return loggedInUser;
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
        dispatch(removeUser());
        return null;
      } finally {
        setUserLoading(false);
        setAuthChecked(true);
      }
    };

    const handleAuth = async () => {
      // If we already have a user in Redux, skip API call
      let currentUser = user;
      
      if (!authChecked) {
        currentUser = await fetchUser();
      }

      if (requireAuth && !currentUser) {
        // Protected route but user not authenticated - redirect to login
        // Protected route + No user = Go to login
        navigate("/login", {
          state: { from: location },
          replace: true,
        });
      } else if (!requireAuth && currentUser) {
        // Public route but user is authenticated - redirect to intended page
        // Public route (Login / Sign up) + Has user = Go to intended destination
        const redirectPath = location?.state?.from?.pathname || "/";
        navigate(redirectPath, {
          replace: true,
        });
      }
    };

    handleAuth();
  }, [requireAuth, location.pathname]); // Only depend on requireAuth and pathname


  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <> {children} </>;
};

export default ProtectedRoutes;
