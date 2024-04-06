import React, { useState } from 'react';
import background from '../assets/background.webp';
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { Link } from 'react-router-dom';

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Function Executed");
    let responseData;
    await fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("Sign Up Function Executed");
    let responseData;
    await fetch('http://localhost:9000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
        if (responseData.success) {
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace("/");
        } else {
          alert(responseData.errors);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (

    <div className='relative w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#b3c2e0]'>
      <img className='absolute inset-0 w-full h-full object-cover' src={background} alt="Background" />
      <div className=' relative w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>

        <form className='form-container w-full md:w-[500px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>
           <h1  className='text-3xl font-bold text-blue-600'>{state}</h1>
          <div className='flex flex-col gap-y-5 '>
            {state === "Sign Up" ?
              <Textbox
                placeholder='Your Name'
                type='name'
                name='name'
                value={formData.username}
                label='Username'
                onChange={changeHandler}
                className='w-full rounded-full' /> : <></>}
            <Textbox
              placeholder='email@example.com'
              type='email'
              name='email'
              label='Email Address'
              value={formData.email}
              onChange={changeHandler}
              className='w-full rounded-full'
            />
            <Textbox
              placeholder='your password'
              type='password'
              name='password'
              label='Password'
              value={formData.password}
              onChange={changeHandler}
              className='w-full rounded-full' />
            <Link to='/dashboard' >
              <Button
                type='submit'
                label='Continue'
                onClick={() => { state === "Login" ? login() : signup() }}
                className='w-full h-10 bg-blue-700 text-white rounded-full'
              />
            </Link>

            {state === "Sign Up" ?
              <p className='text-sm text-gray-500 '>Already have an account ?  <span className='text-blue-600 hover:text-blue-900 hover:underline cursor-pointer' onClick={() => { setState("Login") }}>Login Here</span></p>
              : <p className='text-sm text-gray-500 '>Create an account ?  <span className='text-blue-600 hover:text-blue-900 hover:underline cursor-pointer' onClick={() => { setState("Sign Up") }}>Click Here</span ></p>}
            <div className="flex justify-center gap-4">
              <input type="checkbox" name="" id="" />
              <p className='text-sm text-gray-500 '>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
