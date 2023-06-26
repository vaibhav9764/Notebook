import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup(props) {
  let navigate = useNavigate();


  const [credentials,setCredentials] =useState({name:"",email:"",password:"",cpassword:""})
  
  const handleSubmit= async(e)=>{
    e.preventDefault();
    // Api Call
    const {name,email,password,cpassword}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
   
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name,email,password}),
  });
  const json = await response.json();
  console.log(json);
  if(json.success)
  {
    // Save the Token and Redirect
    localStorage.setItem('auth-token',json.authtoken);
    navigate({pathname:"/"});
    props.showAlert("Account Created Succefully","success")

  }
  else
  {
    props.showAlert("Invalid Credentials","danger")
 
  }

}

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2>Create an Account to us iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
            placeholder="Confirm Password"
            onChange={onChange}
            autoComplete="on"
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Password"
            onChange={onChange}
            autoComplete="on"
            required
            minLength={5}
          />
        </div>    
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
