import React from 'react'

//Importing icons
import { ListCollapse } from 'lucide-react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';



function Navbar({ toggle, setToggle }) {
    return (
        <div className='h-[91px] sticky z-40 border-b flex justify-between items-center px-4'>
            {
                toggle ? <ListCollapse style={{ fontSize: '1.8rem' }} onClick={() => setToggle(false)} className='cursor-pointer'></ListCollapse> : <ArrowRightAltIcon style={{ fontSize: '1.8rem' }} onClick={() => setToggle(true)} className='cursor-pointer'></ArrowRightAltIcon>
            }
            <img src={"https://static.toiimg.com/photo/80387978.cms"} alt='profile' className='w-10 h-10 rounded-full cursor-pointer'></img>
        </div>
    )
}

export default Navbar