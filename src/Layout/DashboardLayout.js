import React from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const DashboardLayout = () => {

  const { user } = useContext(AuthContext)
  const [isAdmin] = useAdmin( user?.email );

  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content">
            {/* Sidebar content here */}
            <li><Link to="/dashboard">My Appointment</Link></li>
            {
              isAdmin && <>
                <li><Link to="/dashboard/allusers">All Users</Link></li>
                <li><Link to="/dashboard/adddoctor">Add Doctor</Link></li>
                <li><Link to="/dashboard/managedoctors">Manage Doctor</Link></li>
                </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
