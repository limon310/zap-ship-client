import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayouts from "../Layouts/RootLayouts/RootLayouts";
import Covarage from "../Pages/Home/Covarage/Covarage";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Home/Auth/Login/Login";
import Register from "../Pages/Home/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../Pages/Rider/Rider";

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
    }
])

export default router;