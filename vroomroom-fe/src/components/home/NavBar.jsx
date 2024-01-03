import { Link } from 'react-router-dom';
import React from 'react';

export default function NavBar({ isAuth, onLogoutHandle }) {
  return (
        <div className='navEdit'>
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
                  <nav>
                  <ul>
                    {isAuth ? (
                      <li>
                        <Link onClick={onLogoutHandle} to="/">Logout</Link>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link to="/signin">Signin</Link>
                        </li>
                        <li>
                          <Link to="/signup">Signup</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>


                  </form>

            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
