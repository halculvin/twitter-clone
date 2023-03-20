import React from 'react'
import { FunctionComponent } from "react";
import { IconType } from 'react-icons';


const SidebarLink:FunctionComponent<{name:string, Icon:IconType, active?:boolean}> = ({name, Icon, active}) => {
  return (
    <div className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl 
        space-x-3 hoverEffect px-4 py-2 w-fit ${active && "font-bold"}`}>
        
        <Icon className='h-7'/>
        <span className='hidden xl:inline'>{name}</span>
    </div>
  )
}

export default SidebarLink