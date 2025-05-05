import { useDispatch, useSelector } from 'react-redux'

import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from './redux/constants.js';
import { addUser } from './redux/userSlice.js';


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  

  const fetchUser = async () => {
    if(user) return;

   try {
    const res = await axios.get(BASE_URL + "/profile/view", {withCredentials: true});
    dispatch(addUser(res?.data?.user));
    navigate("/")

   } catch (error) {
    if(error.status === 401){
      navigate("/login")
    }
    console.error(error.message);
    
   }
  }

  useEffect(() => {
    fetchUser()
  }, [])


  return (
    <div>
    <Navbar/>
    <Outlet/>
    {/* <Footer/> */}
    </div>
  )
}

export default App
