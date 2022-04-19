import React , { useState } from "react"
import { LoginModal, SignUpModal } from "../components"

const StartPage = () =>{
  const [toggleLogin, setToggleLogin] = useState(true);

  return (
    <div className="h-screen w-screen flex justify-center duration-200">
      {toggleLogin ? <LoginModal setToggleLogin={setToggleLogin}/> : <SignUpModal setToggleLogin={setToggleLogin}/>}
    </div>
  )
}

export default StartPage