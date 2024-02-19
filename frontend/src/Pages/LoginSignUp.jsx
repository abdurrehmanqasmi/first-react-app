import React, { useState } from 'react';
import "./CSS/login.css";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHendler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async ()=>{
    console.log("Login" ,formData)
    let responsData;  
    await fetch("http://localhost:4000/login",{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responsData=data)

      if(responsData.success){
        localStorage.setItem('auth-token',responsData.token);
        window.location.replace('/');
      }
        else{
          alert("Invalid email or password. Please try again.")
        }
  }


  const signup = async () =>{
    console.log("Signup",formData)
    let responsData;
  
    await fetch("http://localhost:4000/signup",{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responsData=data)

      if(responsData.success){
        localStorage.setItem('auth-token',responsData.token);
        window.location.replace('/');
      }
        else{
          alert("Existing user found with the same Email Address")
        }

  }
  return ( 
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-field">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHendler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHendler}type="text" placeholder='Your Email' />
          <input name='password' value={formData.password} onChange={changeHendler} type="text" placeholder='Password' /> 
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state === "Sign Up" 
          ? <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login</span></p>
          : <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;
