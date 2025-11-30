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
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import RiderApproval from "../Pages/Dashboard/RiderApproval/RiderApproval";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import RiderRoutes from "./RiderRoutes/RiderRoutes";
import AssignedDelivary from "../Pages/Dashboard/AssignedDelivary/AssignedDelivary";
import CompletedDelivery from "../Pages/Dashboard/CompletedDelivery/CompletedDelivery";
import TrackingParcel from "../Pages/TrackingParcel/TrackingParcel";

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
                element: <PrivateRoutes><Rider></Rider></PrivateRoutes>,
                loader: () => fetch("/covarage.json")
            },
            {
                path: '/tracking/:trackingId',
                Component: TrackingParcel
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
                path: '/dashboard/payment-history',
                Component: PaymentHistory
            },
            {
                path: '/dashboard/payment-success',
                Component: PaymentSuccess
            },
            {
                path: '/dashboard/payment-cancelled',
                Component: Cancelled
            },
            // rider only routes
            {
                path:'/dashboard/assigned-delivary',
                element: <RiderRoutes><AssignedDelivary></AssignedDelivary></RiderRoutes>
                // Component: AssignedDelivary
            },
            {
                path:'/dashboard/completed-delivary',
                element: <RiderRoutes><CompletedDelivery></CompletedDelivery></RiderRoutes>
            },
            // admin only routes
            {
                path: '/dashboard/approve-rider',
                element: <AdminRoutes><RiderApproval></RiderApproval></AdminRoutes>
            },
            {
                path: '/dashboard/assign-rider',
                element: <AdminRoutes><AssignRider></AssignRider></AdminRoutes>
            },
            {
                path: '/dashboard/users-management',
                // Component: ManageUsers
                element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
            }

        ]
    }
])

export default router;