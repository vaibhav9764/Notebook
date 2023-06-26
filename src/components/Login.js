import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";


function Login(props) {
  let navigate = useNavigate();

   const [credentials,setCredentials] =useState({email:"",password:""})
    const handleSubmit= async(e)=>{
        e.preventDefault();
        // Api Call
        const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
  
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ email:credentials.email,password:credentials.password }),
      });
      const json = await response.json();
      console.log(json);
      if(json.success)
      {
        // Save the Token and Redirect
        localStorage.setItem('auth-token',json.authtoken);
        props.showAlert("Logged in Succefully","success")
        navigate({pathname:"/"});
      

      }
      else
      {
        props.showAlert("Invalid details","danger")
      }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <>
      <div className="container">
        <h2>Login to continue in iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
              autoComplete="on"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
