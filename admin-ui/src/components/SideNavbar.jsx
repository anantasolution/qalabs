import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//Importing icons
import { Logs, User } from 'lucide-react';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { Ellipsis } from 'lucide-react';

function SideNavbar({ toggle }) {

    const navigate = useNavigate()
    const location = useLocation()

    const [innerToggle, setInnerToggle] = useState(toggle)

    const handleNavigate = (path) => {
        navigate(path)
    }

    useEffect(() => {
        setInnerToggle(toggle)
    }, [toggle])

    const isActive = (pathname) => {
        console.log(location.pathname)
        if (location.pathname.includes(pathname)) {
            console.log(pathname, "done")
            return true
        } else {
            console.log(pathname, "not done")
            return false
        }
    }

    const mouseIn = () => {
        if (!toggle) {
            setInnerToggle(true)
        }
    }

    const mouseOut = () => {
        if (!toggle) {
            setInnerToggle(false)
        }
    }

    return (
        <div className={`${toggle ? "w-[17%]" : "w-[6%]"} overflow-y-hidden transition-all duration-300 h-full border`}>
            <div className='h-20 px-4 w-full border-b flex justify-start items-center'>
                {
                    toggle ? (
                        <h1 className='font-bold font-mono text-3xl'>Qalabz</h1>
                    ) : (
                        <div className='w-full flex justify-center items-center'>
                            <span className='font-mono bg-blue-500 text-white font-bold text-2xl w-10 h-10 flex justify-center items-center rounded-md'>Q</span>
                        </div>
                    )
                }
            </div>
            {/* Navigation Div */}
            <div onMouseEnter={mouseIn} onMouseLeave={mouseOut} className={`${innerToggle ? "w-[200px] absolute" : "w-auto"} h-[89%] flex bg-white flex-col z-50 transition-all duration-500 px-4 py-6`}>
                <div className='flex flex-col gap-6'>
                    {
                        toggle || innerToggle ?
                            <span className='text-xs text-gray-500 font-semibold'>NAVIGATION</span>
                            : <span className='flex items-center justify-center'><Ellipsis></Ellipsis></span>
                    }
                    {
                        toggle || innerToggle ?
                            (
                                <div onClick={() => handleNavigate("dashboard")} className={`flex ${isActive("dashboard") && "bg-gray-100"} hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}>
                                    <span><SpaceDashboardOutlinedIcon style={{ fontSize: '1.4rem' }}></SpaceDashboardOutlinedIcon></span>
                                    <span className='text-sm font-semibold'>Dashboard</span>
                                </div>
                            ) :
                            (
                                <div onClick={() => handleNavigate("dashboard")} className={`flex ${isActive("dashboard") && "bg-gray-100"} hover:bg-gray-100 cursor-pointer transition-all duration-300  p-1.5 rounded-md  justify-center items-center`}>
                                    <span><SpaceDashboardOutlinedIcon style={{ fontSize: '1.8rem', fontWeight: '200' }}></SpaceDashboardOutlinedIcon></span>
                                </div>
                            )
                    }
                    {
                        toggle || innerToggle ?
                            (
                                <div onClick={() => handleNavigate("blogs")} className={`flex ${isActive("blogs") && "bg-gray-100"} hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}>
                                    <span><Logs style={{ fontSize: '1.4rem' }}></Logs></span>
                                    <span className='text-sm font-semibold'>Blogs</span>
                                </div>
                            ) :
                            (
                                <div onClick={() => handleNavigate("blogs")} className={`flex ${isActive("blogs") && "bg-gray-100"} hover:bg-gray-100 cursor-pointer transition-all duration-300  p-1.5 rounded-md  justify-center items-center`}>
                                    <span><Logs style={{ fontSize: '1.8rem', fontWeight: '200' }}></Logs></span>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default SideNavbar;