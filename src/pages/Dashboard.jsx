import { useState } from "react"
import { SideNavbar, BalanceCard, Buttons, Movments, TransferModal } from "../components"

const Dashboard = () =>{

  const [toggleTransfer, setToggleTransfer] = useState(false);
  
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overscroll-contain">
      <div className="flex flex-row z-10">
        <SideNavbar/>
        <h1 className="mt-3 mb-2 font-bold text-2xl md:text-3xl duration-200 md:hidden">Dashboard</h1>
      </div>
      <div className="p-4 h-screen w-screen flex flex-col max-w-6xl">
        <h1 className="mt-3 mb-4 font-bold text-2xl md:text-3xl text-gray-bnk-200 duration-200 hidden md:flex">Dashboard</h1>
        <p className="mb-2 ml-4 font-regular text-xl md:text-2xl text-gray-bnk-200 duration-200 flex">Balance</p>
        <div className="flex flex-col lg:flex-row md:mb-8">
          <BalanceCard />
          <Buttons setToggleTransfer={setToggleTransfer}/>
        </div>
        <Movments/>
      </div>

      {toggleTransfer && (<TransferModal setToggleTransfer={setToggleTransfer}/>)}

    </div>
  )
}

export default Dashboard