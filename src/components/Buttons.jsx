import React , { useCallback } from 'react';
import { RiShoppingCartLine, RiBitCoinLine, RiArrowLeftRightLine } from "react-icons/ri";
import { useLocalStorage } from '../hooks';

const Buttons = ({setToggleTransfer}) =>{

  const handleChange = useCallback(event => {
    setToggleTransfer(true)
  }, [setToggleTransfer])
  
  return (
    <div className="flex flex-row justify-center p-8">
      <button className="p-4 m-auto lg:mx-4 rounded-full drop-shadow-lg duration-200 bg-green-bnk-gr hover:ring-2 ring-green-600"><RiShoppingCartLine size={28} className='text-white'/></button>
      <button className="p-4 m-auto lg:mx-4 rounded-full drop-shadow-lg duration-200 bg-green-bnk-gr hover:ring-2 ring-green-600"><RiBitCoinLine size={28} className='text-white'/></button>
      <button onClick={handleChange} className="p-4 m-auto lg:mx-4 rounded-full drop-shadow-lg duration-200 bg-green-bnk-gr hover:ring-2 ring-green-600"><RiArrowLeftRightLine size={28} className='text-white'/></button>
    </div>
  )
}

export default Buttons