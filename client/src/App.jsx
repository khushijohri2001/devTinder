import { Provider } from 'react-redux'

import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import store from "./redux/store.js";


function App() {

  return (
    <>
    <Provider store={store}>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </Provider>
    </>
  )
}

export default App
