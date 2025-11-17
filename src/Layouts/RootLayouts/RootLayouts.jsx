import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../../Pages/Home/Shared/NavBar/NavBar';
import Footer from '../../Pages/Home/Shared/Footer/Footer';

const RootLayouts = () => {
    return (
        <div className='max-w-7xl mx-auto flex flex-col min-h-screen'>
            <NavBar></NavBar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;