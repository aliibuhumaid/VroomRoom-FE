import React, { useEffect, useState } from 'react';
import Home from './components/home/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import { Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Corrected import statement
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

import WishlistList from './components/wishlist/WishlistList';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({ id: null }); // Default user object with null id

  useEffect(() => {
    const user = getUser();
    if (user && user.id) {
      setIsAuth(true);
      setUser(user);
    } else {
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser({ id: null }); // Set to default object
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
    if (token) {
      try {
        return jwtDecode(token);  // Decode token
      } catch (error) {
        console.error("Error decoding token: ", error);
        return { id: null };
      }
    }
    return { id: null };  // Return default object if token is not valid
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const onLogoutHandle = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  }

  return (
    <div>
      <NavBar isAuth={isAuth} onLogoutHandle={onLogoutHandle} />
      <div>
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Signin login={loginHandle} />}></Route>
          <Route path='/signup' element={<Signup register={registerHandle} />}></Route>
          <Route path='/signin' element={isAuth ? <Home /> : <Signin login={loginHandle} />}></Route>
          <Route path='/post' element={<PostList key={user.id} userId={user} />}/>
          <Route path='/post/add/:userId' element={<PostCreate />}/>
          <Route path='/post/edit/:id' element={<PostEdit />}/>
          <Route path='/post/detail/:id' element={<PostDetail />}/>
          <Route path='/category' element={<CategoryList />}/>
          <Route path='/category/add' element={<CategoryCreate />}/>
          <Route path='/category/edit' element={<CategoryEdit />}/>
          <Route path='/whishlist' element={<WishlistList key={user.id} userId={user} />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
