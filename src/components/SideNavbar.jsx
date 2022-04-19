import React, { useState } from "react";
import Logo from '../assets/Group_17.png'
import { NavLink } from 'react-router-dom';
import { RiMenu3Line, RiArrowLeftCircleFill, RiUser3Fill, RiLogoutCircleRLine, RiLayout2Fill, RiPieChartFill, RiSettings4Fill } from 'react-icons/ri';

const clearStorage = () => {
  localStorage.clear();
}

const Menu = () => (
  <>
    <p><NavLink to="/dashboard" exact className='flex flex-row items-center py-2 px-4 my-2 text-lg font-semibold'><RiLayout2Fill className=' mr-2 '/>Dashboard</NavLink></p>
    <p><NavLink to="/statistics" exact className='flex flex-row items-center py-2 px-4 my-2 text-lg font-semibold'><RiPieChartFill className=' mr-2 '/>Statistics</NavLink></p>
    <p><NavLink to="/profile" exact className='flex flex-row items-center py-2 px-4 my-2 text-lg font-semibold'><RiUser3Fill className=' mr-2 '/>Profile</NavLink></p>
    <p><NavLink to="/settings" exact className='flex flex-row items-center py-2 px-4 my-2 text-lg font-semibold'><RiSettings4Fill className=' mr-2 '/>Settings</NavLink></p>
    <p><NavLink to="/" exact onClick={() => clearStorage()} className='flex flex-row items-center py-2 px-4 my-2 text-lg font-semibold'><RiLogoutCircleRLine className=' mr-2 '/>Logout</NavLink></p>
  </>
)

const Block = () => (
  <>
    <div className='nav__bg rounded-tr-2xl duration-200 h-44 xl:h-64'>
      <img src={Logo} alt="logo" className="w-32 duration-200 xl:w-44 m-10"/>
    </div>
    <div className='m-2  xl:m-8 flex flex-col'>
        <Menu/> 
    </div>
  </>
)

const SideNavbar = () =>{
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div>
      <div className="h-screen w-56 xl:w-96 duration-200 rounded-r-2xl hidden bg-white drop-shadow-md flex-col md:flex">
        <Block/>
      </div>
      
      <div className="flex relative md:hidden">
        {toggleMenu && (
          <div className="w-56 rounded-r-2xl bg-white drop-shadow-md flex-col flex absolute top-12">
            <Block/>
          </div>
        )}
        {toggleMenu
        ? <RiArrowLeftCircleFill className="text-gray-bnk-200 m-4 cursor-pointer" size={27} onClick={() => setToggleMenu(false)}/>
        : <RiMenu3Line className="text-gray-bnk-200 m-4 cursor-pointer" size={27} onClick={() => setToggleMenu(true)}/>}
      </div>
    </div>
  )
}

export default SideNavbar