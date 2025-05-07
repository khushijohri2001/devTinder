import {createBrowserRouter} from 'react-router-dom';
import Feed from '../pages/Feed';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import App from '../App';
import ProtectedRoutes from './ProtectedRoutes';
import EditProfile from '../pages/EditProfile';
import Connections from '../pages/Connections';
import PendingRequests from '../pages/PendingRequests';

export const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <ProtectedRoutes path="/"><Feed/></ProtectedRoutes>
            },
            {
                path: "/login",
                element: <ProtectedRoutes path="/login"><Login/></ProtectedRoutes>
            },
            {
                path: "/signup",
                element: <ProtectedRoutes path="/signup"><Signup/></ProtectedRoutes>
            },
            {
                path: "/profile",
                element: <ProtectedRoutes path="/profile"><EditProfile/></ProtectedRoutes>
            },
            {
                path: "/connections",
                element: <ProtectedRoutes path="/connections"><Connections/></ProtectedRoutes>
            },
            {
                path: "/pending-requests",
                element: <ProtectedRoutes path="/pending-requests"><PendingRequests/></ProtectedRoutes>
            },
        ]
    }
])