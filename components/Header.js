import Image from "next/image"
import {BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon} from '@heroicons/react/solid'
import {FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon} from '@heroicons/react/outline'
import HeaderIcon from "./HeaderIcon"
import { signOut, useSession } from "next-auth/react"

const Header = () => {
const {data : session} = useSession();
  return (
    <div className="sticky top-0 z-50 flex bg-white items-center p-2 lg:px-5 shadow-md">
        
        {/* Left */}
        <div className="flex items-center">
            <Image className="cursor-pointer" src="https://links.papareact.com/5me" width={40} height={40} layout="fixed"/>
            <div className="flex bg-gray-100 p-2 ml-2 rounded-full items-center">
                <SearchIcon className="h-6 text-gray-600"/>
                <input className="hidden bg-transparent outline-none ml-2 lg:inline-flex items-center flex-shrink" type="text" placeholder="Search Facebook"/>
            </div>
        </div>

        {/* Center */}
        <div className="flex justify-center flex-grow">
            <div className="flex space-x-6 md:space-x-2">
                <HeaderIcon active={true} Icon={HomeIcon}/>
                <HeaderIcon Icon={FlagIcon}/>
                <HeaderIcon Icon={PlayIcon}/>
                <HeaderIcon Icon={ShoppingCartIcon}/>
                <HeaderIcon Icon={UserGroupIcon}/>
            </div>
        </div>
        
        {/* Right */}
        <div className="flex items-center sm:space-x-2 justify-end">
            {/* Profile pic */}
            <Image
            onClick={signOut}
            className="rounded-full cursor-pointer"
            src={session.user.image}
            width="40"
            height="40"
            layout="fixed"
            />
            <p className="font-semibold pr-3 whitespace-nowrap">{session.user.name}</p>
            <ViewGridIcon className="icon"/>
            <ChatIcon className="icon"/>
            <BellIcon className="icon"/>
            <ChevronDownIcon  className="icon"/>
        </div>
    
    
    </div>
  )
}

export default Header