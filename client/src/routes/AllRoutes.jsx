import {createBrowserRouter} from 'react-router-dom';
import Feed from '../pages/Feed';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import App from '../App';
import ProtectedRoutes from './ProtectedRoutes';
import EditProfile from '../pages/EditProfile';
import Connections from '../pages/Connections';
import PendingRequests from '../pages/PendingRequests';
import UpgradePlans from '../pages/UpgradePlans';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsConditions from '../pages/TermsConditions';
import CancellationRefund from '../pages/CancellationRefund';
import ShippingDelivery from '../pages/ShippingDelivery';
import ContactUs from '../pages/ContactUs';

export const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <ProtectedRoutes requireAuth="true"><Feed/></ProtectedRoutes>
            },
            {
                path: "/login",
                element: <ProtectedRoutes requireAuth="false"><Login/></ProtectedRoutes>
            },
            {
                path: "/signup",
                element: <ProtectedRoutes requireAuth="false"><Signup/></ProtectedRoutes>
            },
            {
                path: "/profile",
                element: <ProtectedRoutes requireAuth="true"><EditProfile/></ProtectedRoutes>
            },
            {
                path: "/connections",
                element: <ProtectedRoutes requireAuth="true"><Connections/></ProtectedRoutes>
            },
            {
                path: "/pending-requests",
                element: <ProtectedRoutes requireAuth="true"><PendingRequests/></ProtectedRoutes>
            },
            {
                path: "/upgrade-plans",
                element: <ProtectedRoutes requireAuth="true"><UpgradePlans/></ProtectedRoutes>
            },
            {
                path: "/terms-conditions",
                element: <TermsConditions/>
            },
            {
                path: "/cancellation-refund",
                element: <CancellationRefund/>
            },
            {
                path: "/shipping-delivery",
                element: <ShippingDelivery/>
            },
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy/>
            },
            {
                path: "/contact-us",
                element: <ContactUs/>
            },
        ]
    }
])