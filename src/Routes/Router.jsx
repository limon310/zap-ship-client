import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayouts from "../Layouts/RootLayouts/RootLayouts";
import Covarage from "../Pages/Home/Covarage/Covarage";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Home/Auth/Login/Login";
import Register from "../Pages/Home/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import MyParcels from "../Pages/Dashboard/MyParcel/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import Cancelled from "../Pages/Dashboard/Payment/Cancelled";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayouts,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: "/send-parcel",
                element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
                loader: () => fetch("/covarage.json")
            },
            {
                path: "/covarage",
                Component: Covarage,
                loader: ()=> fetch("/covarage.json").then(res=> res.json())
            },
            {
                path: '/rider',
                element: <PrivateRoutes><Rider></Rider></PrivateRoutes>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayouts,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayouts></DashboardLayouts></PrivateRoutes>,
        children: [
            {
                path: '/dashboard/my-parcel',
                Component: MyParcels
            },
            {
                path: '/dashboard/payment/:parcelId',
                Component: Payment
            },
            {
                path: '/dashboard/payment-success',
                Component: PaymentSuccess
            },
            {
                path: '/dashboard/payment-cancelled',
                Component: Cancelled
            },

        ]
    }
])

export default router;