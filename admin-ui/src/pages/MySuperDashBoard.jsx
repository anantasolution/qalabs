import React, { useState } from 'react'

import { Outlet } from 'react-router-dom';

//Importing components
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';


function MySuperDashboard() {

    const [toggle, setToggle] = useState(true)

    return (
        <div className='max-w-screen h-[100vh] flex'>
            {/* Side navbar */}
            <SideNavbar toggle={toggle} setToggle={setToggle}></SideNavbar>
            <div className={`flex ${toggle ? "w-[83%]" : "w-[94%]"} flex-col`}>
                {/* Navbar  */}
                <Navbar toggle={toggle} setToggle={setToggle}></Navbar>
                <div className='w-full overflow-y-scroll h-full bg-[#F5F5F5]'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default MySuperDashboard