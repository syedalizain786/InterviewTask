import React from 'react';
import { useState } from 'react';
import { Navigate, redirect } from 'react-router-dom';
import axios from 'axios'
function Login() {
    const [credentials,setCredentials]=useState({
        username:'',
        password:''
    });
    const [navigate,setNavigate]=useState(false);

    const handleChange = (e) => {
        setCredentials({
          ...credentials,
          [e.target.name]: e.target.value
        });
      };

    const handleSubmit= async(e)=>{
      try{
        e.preventDefault();
      
        const response=await axios.post("https://hiring-test-task.vercel.app/api/login",credentials)
        localStorage.setItem('token',response.data.token);

        axios.defaults.headers.common['Authorization']=`Bearer ${response.data.token}`;
        //console.log("Authorization Header Set:", axios.defaults.headers.common['Authorization']); 
        setNavigate(true);
      } catch (error) {
        console.error("Login failed:", error);
        }
    }

    if(navigate){
      return <Navigate to='/appointments'/>
    }


  return (
    <div style={
     {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'90vh'
     }
    }>
        <form onSubmit={handleSubmit}>
            <div style={
              {
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
              }
            }>

            <img id="logo" src='/ccriptLogo.png'/>

            </div>
            <br/>

            <label>Username
            </label>
            <br/>
            <input type='text' name='username' value={credentials.username} onChange={handleChange} style={{
              width:'380px',
              height:'48px',
              border:'0px, 0px, 1px, 0px',
              marginTop:'10px'
              
            }}/>
            <br/>
            <label>Password
            </label>
            <br/>
            <input type='text' name='password' value={credentials.password} onChange={handleChange} style={{
              width:'380px',
              height:'48px',
              marginTop:'10px',
              
            }}/>
            <br/>
            <button type='submit' style={{
              width:'380px',
              height:'48px',
              marginTop:'10px',
              borderRadius:'12px',
              backgroundColor:'rgba(10, 163, 110, 1)'
            }}>
            Sign In</button>
        </form>
    </div>
  )
}

export default Login