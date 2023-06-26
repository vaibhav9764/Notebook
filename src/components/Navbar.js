import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {useNavigate} from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();
  const handleClick=()=>{
    localStorage.removeItem('auth-token');
    navigate({pathname:"/login"});
  }
 
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
        
        
     {!localStorage.getItem('auth-token')? <form className="d-flex" role="search">
      <Link type="button" className="btn btn-primary mx-2" to="/login">Login</Link>
      <Link type="button" className="btn btn-primary mx-2" to="/signup">Sign-Up</Link>
      </form>:<button onClick={handleClick } className='btn btn-primary' >Logout</button>}
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
