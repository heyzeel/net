import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ChatState } from '../Context/ChatProvider';

const Login = (props) => {
  const navigate = useNavigate()
  const { setLoading } = ChatState();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const login = async () => {
    try {
      let user=false;
      await axios.post(`${import.meta.env.VITE_URL}/api/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res =>user = res.data)
      
      if(user.success){
        localStorage.setItem('userInfo', JSON.stringify({ _id: user._id, name: user.name, email: user.email, pic: user.pic, token: user.token }));
  
        const authUser = JSON.parse(localStorage.getItem('userInfo'));
        if (authUser) { navigate("/chat") }
        setLoading(true)
      }
      else{
        alert("user not found!")
      }
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='login-container'>
      <h1>Welcome to Charcha</h1>
      <div className='login-form'>
        <input type='text' name='email' placeholder='Email' onChange={handleChange} value={formData.email} autoComplete="off"></input>

        <label className='password-container'>
          <input type={showPass ? 'text' : 'password'} name='password' placeholder='Password' onChange={handleChange} value={formData.password} id='pass-inp'>
          </input>
          {showPass ? <FaRegEye className='eye' onClick={() => { setShowPass(!showPass) }} />
            : <FaRegEyeSlash className='eye' onClick={() => { setShowPass(!showPass) }} />}
        </label>

        <hr></hr>

        <input type='submit' value='Login' className='login-btn' onClick={login}></input>

        <div className='login-bottom'>
          <span>Not a member?<Link onClick={() => props.setState(true)}>Sign Up now</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login;
