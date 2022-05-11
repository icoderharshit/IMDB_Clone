import React from 'react';
import {Link} from "react-router-dom";
import {FilmIcon,UserCircleIcon} from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react'
import { Fragment} from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
function NavBar(props) {
    async function logout(){
        await localStorage.clear();
        window.location.assign("/login");
    }
    return <>
        <div className
        ="border 
        pl-12 py-1 space-x-8
         flex  items-center
        ">
            <FilmIcon className="w-[35px] md:w-[40px] text-indigo-900" alt=""></FilmIcon>
            <Link to="/" className=
            {`text-indigo-900 
            font-bold 
            text-xl
            md:text-2xl`}>Movies</Link>
            <Link to="/favourites" className="text-indigo-900 font-bold text-xl md:text-2xl ">Favourites</Link>
            <div className='block sm:inline-block sm:absolute sm:right-4 transition-all'>
         <Menu as="div">
        <div>
          <Menu.Button>
          <UserCircleIcon className='text-indigo-900' style={{"display":"inline","height":"30px","marginRight":"6px"}}></UserCircleIcon>Hello, <span className='font-bold'>{props.userName}</span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={logout}
                    className={`${
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
             
            </div>
     
           
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  



        </div>
    </>;
}

export default NavBar;
