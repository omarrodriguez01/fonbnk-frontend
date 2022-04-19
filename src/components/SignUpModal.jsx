import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../hooks';

// const USER_REGEX = /^[a-zA-Z][a-zA-A0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{3,23}$/;
const REGISTER_URL = '/users/register'

const SignUpModal = ({setToggleLogin}) => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/dashboard';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    // const result = USER_REGEX.test(user);
    // console.log(result);
    setValidName(true);
  }, [user])

  useEffect(() => {
    // const result = PWD_REGEX.test(pwd);
    // console.log(result);
    setValidPwd(true);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleChange = useCallback(event => {
    setToggleLogin(true)
  }, [setToggleLogin])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(REGISTER_URL,
        { username: user, password: pwd }
      );
      const accessToken = response?.data?.token;
      const userId = response?.data?.userId;
      setAuth({user, pwd, userId, accessToken});
      setUser('');
      setPwd('');
      console.log('Register success');
      navigate(from, {replace: true});
    } catch (err) {
      if(!err?.response) {
        setErrMsg('No server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed')
      }
      console.log('Register failed, try again');
      errRef.current.focus();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-6 bg-white drop-shadow-md rounded-2xl m-auto">
      <p ref={errRef} aria-live="assertive" className={errMsg ? "flex justify-center font-bold text-sm text-red-600" : "hidden"}>{errMsg}</p>
      <p className="flex justify-center font-bold text-2xl">Sign Up</p>
      <input 
        type="text" 
        id='username' 
        placeholder="Username" 
        ref={userRef} 
        autoComplete='off' 
        onChange={(e) => setUser(e.target.value)} 
        required 
        aria-invalid={validName ? "false" : "true"} 
        onFocus={() => setUserFocus(true)} 
        onBlur={() => setUserFocus(false)} 
        className="bg-white rounded-2xl outline-none border-2 duration-200 h-12 w-64 px-6 my-4 hover:drop-shadow-md focus:drop-shadow-md"
      />

      <input 
        type="password" 
        id='password' 
        placeholder="Password" 
        onChange={(e) => setPwd(e.target.value)} 
        required 
        aria-invalid={validPwd ? "false" : "true"} 
        onFocus={() => setUserFocus(true)} 
        onBlur={() => setUserFocus(false)} 
        className="bg-white rounded-2xl outline-none border-2 duration-200 h-12 w-64 px-6 my-4 hover:drop-shadow-md focus:drop-shadow-md"
      /> 

      <input 
        type="password" 
        id='confirm_pwd' 
        placeholder="Confirm Password" 
        onChange={(e) => setMatchPwd(e.target.value)} 
        required 
        aria-invalid={validMatch ? "false" : "true"} 
        onFocus={() => setMatchFocus(true)} 
        onBlur={() => setMatchFocus(false)} 
        className="bg-white rounded-2xl outline-none border-2 duration-200 h-12 w-64 px-6 my-4 hover:drop-shadow-md focus:drop-shadow-md"
      />  

      <button
        disabled={!validName || !validPwd || !validMatch ? true : false}
        className="bg-green-bnk-200 text-white rounded-2xl outline-none drop-shadow-md duration-200 h-12 w-64 my-4 hover:bg-green-600"
      >Sign Up</button>

      <p className="flex justify-center font-bold text-sm mt-8">Aready have an account?<a onClick={() => setToggleLogin(true)} className="text-green-bnk-200 ml-1 hover:text-green-600 cursor-pointer"> Login</a></p>
    </form>
  )
}

export default SignUpModal