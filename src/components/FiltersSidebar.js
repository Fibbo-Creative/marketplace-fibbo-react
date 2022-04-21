import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import FilterBottomDropDown from './FilterBottomDropDown';

export default function FiltersSidebar() {
const [showSidebar, setShowSidebar] = useState(false);

  return (
      <>
        {showSidebar ? (
            <div
            className={`flex flex-col top-20 left-0 w-[20vw] bg-purple-600 p-10 pl-20 fixed h-full z-40 ease-in-out duration-300 ${
            showSidebar ? "-translate-x-0 " : "-translate-x-full"
            }`}
            >
        <div className="flex flex-row cursor-pointer gap-20"  onClick={() => setShowSidebar(!showSidebar)}>          
            <h3 className="text-4xl font-semibold text-white">Filters</h3>
            <button>
                <Icon
                    icon="bi:filter-left"
                    hFlip={true}
                    width="40"
                    height="40"
                    color="purple"/> 
                </button>
            </div>
            <div className="flex flex-col left-0  w-full top-28 fixed gap-7">
                <FilterBottomDropDown namefilter="Status" />
                <FilterBottomDropDown namefilter="Price"/>
                    
            </div>
            </div>
            ):(
            <button
            
                onClick={() => setShowSidebar(!showSidebar)}
                className="flex text-4xl text-white items-center cursor-pointer fixed left-10 top-24 z-50 hover:-translate-y-1">
                <Icon
                icon="bi:filter-left"
                width="40"
                height="40"
                color="purple"
                />/
            </button>
        )}
       </>
  )
}
