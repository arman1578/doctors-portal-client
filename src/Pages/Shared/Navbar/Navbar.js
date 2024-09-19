import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { FaUser } from "react-icons/fa";

const Navbar = () => {

  const { user, logout } = useContext(AuthContext);

    const handleLogOut = () => {
        logout()
        .then(() => {})
        .catch(error => console.error(error));
    }
 
    const menuItems = <>
          <li><Link className='mr-2 font-bold' to="/">Home</Link></li>

          {
            user?.uid ?
            <>
             
              <li><Link className='mr-2 font-bold' to="/appointment">Make Appointments</Link></li>
              <li><Link className='mr-2 font-bold' to="/dashboard">My Appointment</Link></li>
              <li className='mr-2 font-bold text-lg text-primary mt-1 ml-3'>{user.displayName}</li>
              {user?.photoURL ? <img className='mr-2 ml-2 w-10 h-10 rounded-full' src={ user?.photoURL} alt="" /> : 
              <FaUser className='mr-2 ml-2  w-10 h-10 rounded-full'></FaUser>}
              <li><button className='mr-2 font-bold' onClick={handleLogOut}>Sign Out</button></li>
            </>
            
            : <li><Link className='mr-2 font-bold' to="/login">Login</Link></li>
          
          }
    </>
    return (
    <div className="navbar bg-base-100 flex justify-between">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} role="button" className="btn btn-ghost btn-circle rounded mr-2 mt-1 ml-3 w-10 h-10 hover:text-primary hover:bg-transparent hover:border-primary hover:border lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          {menuItems}
        </ul>
      </div>
      <Link to='/' className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {menuItems}
      </ul>
    </div>
    <label htmlFor='dashboard-drawer'  tabIndex={2} role="button" className=" btn btn-ghost btn-circle rounded mr-2 ml-3 w-10 h-10 hover:text-primary hover:bg-transparent hover:border-primary hover:border lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
  </div>  
    );
};

export default Navbar;