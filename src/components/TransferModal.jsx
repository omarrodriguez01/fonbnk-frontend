import React , { useCallback, useState, useRef } from 'react';
import axios from '../api/axios';
import { useAuth, useLocalStorage } from '../hooks';

const TRANSFER_URL = '/users/transfer';

const TransferModal = ({setToggleTransfer}) =>{
  const { auth } = useAuth();

  const [toggleLoading, setToggleLoading] = useState(false); //TODO

  const errRef = useRef();
  const sucRef = useRef();

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [succesMsg, setSuccesMsg] = useState('');

  const handleChange = useCallback(event => {
    setToggleTransfer(false)
  }, [setToggleTransfer])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(TRANSFER_URL, 
        { address: address, id: auth.userId, amount:amount },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': auth.accessToken
          }
        }
      );
      
      setAddress('');
      setAmount('');
      setSuccesMsg('Transfer successful');
      console.log('Transfer successful!');
      window.location.reload(false);
    } catch (err) {
      if(!err?.response) {
        // setErrMsg('No server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Wrong Addres or Amount');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Transfer Failed')
      }
      console.log('Transfer failed, try again');
      errRef.current.focus();
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-bnk-200-t flex justify-center z-20 absolute">
      <div className="flex flex-col p-6 bg-white drop-shadow-md rounded-2xl m-auto">
       <p ref={errRef} aria-live="assertive" className={errMsg ? "flex justify-center font-bold text-sm text-red-600" : "hidden"}>{errMsg}</p>
       <p ref={sucRef} aria-live="assertive" className={succesMsg ? "flex justify-center font-bold text-sm text-green-600" : "hidden"}>{succesMsg}</p>
        <p className="flex justify-center font-bold text-2xl">Transfer</p>
        <input 
        type="text" 
        id='address' 
        placeholder="Address" 
        autoComplete='off' 
        onChange={(e) => setAddress(e.target.value)} 
        value={address}
        required
        className="bg-white rounded-2xl outline-none border-2 duration-200 h-12 w-64 px-6 my-4 hover:drop-shadow-md focus:drop-shadow-md"
        />
        <input 
        type="text" 
        id='amount' 
        placeholder="Amount" 
        autoComplete='off' 
        onChange={(e) => setAmount(e.target.value)} 
        value={amount}
        required 
        className="bg-white rounded-2xl outline-none border-2 duration-200 h-12 w-64 px-6 my-4 hover:drop-shadow-md focus:drop-shadow-md"
        />
        <div className='flex flex-row my-4'>
          <button onClick={handleChange} className="bg-gray-bnk-100 text-white rounded-2xl outline-none drop-shadow-md duration-200 h-12 w-28 m-auto hover:bg-gray-500">Back</button>
          <button onClick={handleSubmit} className="bg-green-bnk-200 text-white rounded-2xl outline-none drop-shadow-md duration-200 h-12 w-28 m-auto hover:bg-green-600">Transfer</button>
        </div>
        
      </div>

    </div>
  )
}

export default TransferModal