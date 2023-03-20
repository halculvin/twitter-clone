import React from 'react'
import { BsBell, BsBookmark, BsThreeDots, BsTwitter } from 'react-icons/bs';
import { BiHash } from 'react-icons/bi';
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClipboardList, HiOutlineDotsCircleHorizontal} from 'react-icons/hi';
import SidebarLink from './SidebarLink';
import { signOut, useSession } from 'next-auth/react';


const Sidebar = () => {

    const {data: session} = useSession();

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
        <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
            <BsTwitter className='text-white text-[34px]'/>
        </div>
        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
            <SidebarLink name="Home" Icon={AiFillHome} active />
            <SidebarLink name="Explore" Icon={BiHash}/>
            <SidebarLink name="Notifications" Icon={BsBell}/>
            <SidebarLink name="Messages" Icon={AiOutlineInbox}/>
            <SidebarLink name="Bookmarks" Icon={BsBookmark}/>
            <SidebarLink name="Lists" Icon={HiOutlineClipboardList}/>
            <SidebarLink name="Profile" Icon={AiOutlineUser}/>
            <SidebarLink name="More" Icon={HiOutlineDotsCircleHorizontal}/>
        </div>

        <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-52 h-[52px] 
            text-lg font-bold hover:bg-[#1a8cd8]'>Tweet</button>

        <div className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverEffect xl:ml-auto xl:-mr-5" onClick={() => signOut()}>
            <img src={session?.user?.image!}
                alt=""
                className='h-10 w-10 rounded-full xl:mr-2.5'
            />
            <div className='hidden xl:inline leading-5'>
                <h4 className='font-bold'>{session?.user?.name}</h4>
                <h4 className='text-[#6e767d]'>@{session?.user?.tag}</h4>
            </div>

            <BsThreeDots className='h-5 hidden xl:inline ml-10'/>
        </div>

    </div>
  )
}

export default Sidebar