import React , { useCallback, useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import axios from '../api/axios';

const LOGIN_URL = '/users/login'

const LoginModal = ({setToggleLogin}) =>{
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/dashboard';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  
  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleChange = useCallback(event => {
    setToggleLogin(false)
  }, [setToggleLogin])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, 
        { username: user, password: pwd }
      );
      
      const accessToken = response?.data?.token;
      const userId = response?.data?.userId;
      setAuth({user, pwd, userId, accessToken});
      setUser('');
      setPwd('');
      console.log('Login successful!');
      navigate(from, {replace: true});
    } catch (err) {
      if(!err?.response) {
        setErrMsg('No server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Wrong Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed')
      }
      console.log('Login failed, try again');
      errRef.current.focus();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-6 bg-white drop-shadow-md rounded-2xl m-auto">
      <p ref={errRef} aria-live="assertive" className={errMsg ? "flex justify-center font-bold text-sm text-red-600" : "hidden"}>{errMsg}</p>
      <p className="flex justify-center font-bold text-2xl">Login</p>
      <input 
        type="text" 
        id='username' 
        placeholder="Username" 
        ref={userRef} 
        autoComplete='off' 
        onChange={(e) => setUser(e.target.value)} 
        value={user} 
        required 
        className="bg-white rounded-2xl outline-none border-2 duration-200 h-12 w-64 px-6 my-4 hover:drop-shadow-md focus:drop-shadow-md"
      />
      <input 
        type="password" 
        id='password' 
        placeholder="Password" 
        onChange={(e) => setPwd(e.target.value)} 
        value={pwd} 
        required
        className="bg-white rounded-2xl outline-none border-2 duration-200 h-12 w-64 px-6 my-4 hover:drop-shadow-md focus:drop-shadow-md"
      />
      <button 
        className="bg-green-bnk-200 text-white rounded-2xl outline-none drop-shadow-md duration-200 h-12 w-64 my-4 hover:bg-green-600"
      >Login</button>
      <p className="flex justify-center font-bold text-sm mt-8">Don’t have account? <a onClick={handleChange} className="text-green-bnk-200 ml-1 hover:text-green-600 cursor-pointer"> Sign Up</a></p>
    </form>
  )
}

export default LoginModal