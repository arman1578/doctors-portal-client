import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../Layout/DashboardLayout";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import Payment from "../../Pages/Payment/Payment";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <DisplayError />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/appointment',
                element: <Appointment />
            }
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError />,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashboard/managedoctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                loader: ({params}) => fetch(`https://doctors-portal-server-kappa-wine.vercel.app/bookings/${params.id}`)
            }
        ]
    }
])

export default router;