import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../redux/constants.js";
import { addUser, removeUser } from "../redux/userSlice.js";

const ProtectedRoutes = ({ children, requireAuth }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    // User can access the route as already logged in
    if (user && authCheck) {
      setUserLoading(false);
      return;
    }

    try {
      setUserLoading(true);

      // getting user from cookie and not redux
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      const loggedInUser = response?.data?.user;

      if (loggedInUser) {
        dispatch(addUser(loggedInUser));
        return loggedInUser;

      } else {
        dispatch(removeUser());
        return null
      }

    } catch (error) {
      console.error("Failed to fetch user:", error.message);
      dispatch(removeUser());

    } finally {
      setUserLoading(false);
      setAuthCheck(true);
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      const currentUser = await fetchUser();

      if(requireAuth){
        // Protected Route Logic: not logged-in so rediect them to login page

        if(!currentUser){
          navigate("/login", {
          state: location,
          replace: true,
        });
        } else{
          // Public Route Login: Logged-in so take them to where they cam from or "/" by default if nothing was found

          if(currentUser){
            const redirectPath = location?.state?.from?.pathname || "/"
            navigate(redirectPath, {
              replace: true
            })
          }
        }
      }

    }

    handleAuth()
    
  }, []);

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
