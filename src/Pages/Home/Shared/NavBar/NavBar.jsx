import React from 'react';import Logo from '../../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
;

const NavBar = () => {
    const {user, signOutUser} = useAuth();
    const links = <>
    <li><NavLink>Services</NavLink></li>
    <li><NavLink to="/covarage">Covarage</NavLink></li>
    <li><NavLink to="/rider">Rider</NavLink></li>
    </>

    // sign out user
    const handleSignOut = () =>{
        signOutUser()
        .then()
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div className="navbar bg-base-100 shadow-sm mb-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <Logo></Logo>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?
                    <a onClick={handleSignOut} className="btn">Log Out</a>
                    :<Link to="/login" className="btn">Login</Link>
                }
                <Link to="/rider" className='btn btn-primary ml-3'>Be A Rider</Link>
            </div>
        </div>
    );
};

export default NavBar;