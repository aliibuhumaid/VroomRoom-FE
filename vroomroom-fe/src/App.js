import React, { useEffect, useState } from 'react';
import Home from './components/home/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import {Routes, Route} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Axios from 'axios';

import NavBar from './components/home/NavBar';
import Footer from './components/home/Footer';

import PostList from './components/Post/PostList';
import PostCreate from './components/Post/PostCreate';
import PostEdit from './components/Post/PostEdit';
import PostDetail from './components/Post/PostDetail';

import CategoryList from './components/Category/CategoryList';
import CategoryCreate from './components/Category/CategoryCreate';
import CategoryEdit from './components/Category/CategoryEdit';

import WishList from './components/home/WishList';
import WishlistList from './components/wishlist/WishlistList';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = getUser();
    if (user) {
      setIsAuth(true);
      setUser(user);
    } else {
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser(null);
    }
  }, []);

  const registerHandle = (user) => {
    Axios.post("auth/signup", user)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loginHandle = (cred) => {
    Axios.post("auth/signin", cred)
      .then(res => {
        let token = res.data.token;
        if (token) {
          localStorage.setItem("token", token);
          const user = getUser();
          user ? setIsAuth(true) : setIsAuth(false);
          user ? setUser(user) : setUser(null);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const onLogoutHandle = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  };

  return (
    <div>
      <NavBar isAuth={isAuth} onLogoutHandle={onLogoutHandle} />
      <div>
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Signin login={loginHandle} />} />
          <Route path='/signup' element={<Signup register={registerHandle} />} />
          <Route path='/signin' element={isAuth ? <Home /> : <Signin login={loginHandle} />} />
          <Route path='/post' element={<PostList />} />
          <Route path='/post/add' element={<PostCreate />} />
          <Route path='/post/edit/:id' element={<PostEdit />} />
          <Route path='/category' element={<CategoryList />} />
          <Route path='/category/add' element={<CategoryCreate />} />
          <Route path='/category/edit/:id' element={<CategoryEdit />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
