import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import useCollapse from 'react-collapsed'

export default function FilterBottomDropDown( name) {
const [isExpanded, setExpanded] = useState(false)
const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
const [selectedFilter, setSelectedFilterName] = useState('')
let value = 0;
useEffect(() => {
    setSelectedFilterName(name);
  }, );

const handleChange = (type, value, item) => {
    if (type === "max") {
      if (value <= 200) {
        item.setState({ ...item.state, max: value });
      } else {
        item.setState({ ...item.state, max: 200 });
      }
    } else {
      if (value >= 199) {
        item.setState({ ...item.state, min: 199 });
      } else {
        item.setState({ ...item.state, min: value });
      }
    }
  };  
 

  return (
    <div className='flex flex-col text-white bg-white-600 z-50 p-2 h-50 border border-black'>
    <button className=''
        {...getToggleProps({
        onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}>

        {isExpanded ? 
        <div className='flex flex-row items-center justify-center gap-40'>  
            <h3 className="text-2xl text-white">Status</h3>
            <button>
                <Icon
                    icon="ci:play-arrow" 
                    rotate={1} 
                    width="20"
                    height="20"
                    color="black"/> 
            </button>
            </div> : 
            <div className='flex flex-row items-center justify-center gap-40'>  
            <h3 className="text-2xl text-white">Status</h3>
            <button>
                <Icon
                    icon="ci:play-arrow"  
                    width="20"
                    height="20"
                    color="black"/> 
            </button>
            </div>}
    </button>
    <section {...getCollapseProps()}>

    <div className='grid grid-cols-2 gap-4 w-full h-30 p-5' >
        
        <button className='flex items-center bg-purple-600 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-purple-700' >
            Buy Now
        </button>

        <button className='flex items-center bg-purple-600 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-purple-700'  >
            Has Offers
        </button>

       
        <button className='flex items-center bg-purple-600 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-purple-700'  >
            On Auction
        </button>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2">
             <div className="flex flex-row justify-center items-center w-full gap-3 p-5">
                        <div className="rounded text-black ">
                            <input
                                size="10"
                                required=""
                                type="number"
                                className="p-1 w-28 border transition input-field border-2 focus:border-2"
                                value="Min"
                                onChange={(e) =>
                                    handleChange("min", e.target.value)
                                }
                            />
                        </div>
                        <h1 className="text-white font-semibold">to</h1>
                        <div className="text-black rounded ">
                                <input
                                    size="10"
                                    type="number"
                                    className="p-1 w-28 border transition text-14 input-field border-2 focus:border-2"
                                    value="Max"
                                    onChange={(e) =>
                                    handleChange("max", e.target.value)
                                    }
                                />
                        </div>
             </div>
            <button className='flex items-center bg-purple-600 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-purple-700'  >
                Apply
            </button>
        </div>


    </section>
    </div>
  )
}
