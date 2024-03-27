import React from 'react'
import { IconType } from 'react-icons';

interface SidebarLogoutProps {
    icon: IconType
    onClick: () => void;
}

const SidebarLogout: React.FC<SidebarLogoutProps> = ({ onClick, icon: Icon }) => {
    return (
        <div className='flex flex-row items-center'>
            <div className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer'>
                <Icon color='white'></Icon>
            </div>
            <div className='text-white'>Log Out</div>
        </div>
    )
}

export default SidebarLogout