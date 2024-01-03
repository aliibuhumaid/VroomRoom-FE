import React from "react";
import {Routes, Route, Link} from 'react-router-dom';



class NavBar extends React.Component{
    render() {
        return (
        <div>
                
<header>
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">VroomRoom</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <Link to="/category" className="nav-link active">Category</Link>
          </li>
          <li className="nav-item">
            <Link to="/post" className="nav-link active">Post</Link>
          </li>
          <li>
            <Link to="/whishlist" className="nav-link active">Whishlist</Link>
          </li>
        </ul>
        <form className="d-flex">
          
          <button  href="auth/signin" className="btn btn-outline-success" >Signin</button>
          <button href="auth/signup"className="btn btn-outline-success" >SignUp</button>

          
        </form>
      </div>
    </div>
  </nav>
</header>
</div>
)
}
}

export default NavBar;