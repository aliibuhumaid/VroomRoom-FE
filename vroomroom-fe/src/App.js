import React, { useEffect, useState } from 'react';
import Home from './components/home/Home';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import {Routes, Route, Link} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import Axios from 'axios';
import WishList from './components/home/WishList';
import CategoryList from './components/home/CategoryList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
   const [isAuth, setIsAuth] = useState(false);
   const [user, setUser] = useState({});
   useEffect(() => {
  const user = getUser();
  console.log(user);
  if(user){
   setIsAuth(true);
   setUser(user);
  }else{
   localStorage.removeItem("token");
   setIsAuth(false);
   setUser(null);
  }
 },[])
   const registerHandle = (user) => {
     Axios.post("auth/signup", user)
     .then(res => {
       console.log(res);
     })
     .catch(err => {
       console.log(err);
     })
   }
   const loginHandle = (cred) => {
     Axios.post("auth/signin", cred)
     .then( res => {
       console.log(res.data.token);
       let token = res.data.token;
       if(token != null)
       {
         localStorage.setItem("token", token);
         const user = getUser();
         console.log(user);
         user ? setIsAuth(true) : setIsAuth(false)
         user ? setUser(user) : setUser(null)
       }
     })
     .catch(err => {
       console.log(err);
     })
   }
   const getUser =() => {
 const token = getToken();
 return token ? jwtDecode(token).user : null
   }
   const getToken = () => {
     const token = localStorage.getItem("token");
     return token;
   }
   const onLogoutHandle = (e) => {
     e.preventDefault();
     localStorage.removeItem("token");
     setIsAuth(false);
     setUser(null);
   }
   return (
     <div>
       <nav>
         {isAuth ?
         (
           <div>
           <Link to="/">Home</Link> &nbsp;
           <Link to="/logout" onClick={onLogoutHandle}>Logout</Link>
         </div>
         ) :
         (
           <div>
           <Link to="/">Home</Link> &nbsp;
           <Link to="/signup">Signup</Link> &nbsp;
           <Link to="/signin">Signin</Link> &nbsp;
         </div>
         )
       }
       </nav>
       <div>
       <Routes>
           <Route path="/" element={ isAuth ? <Home /> : <Signin login={loginHandle}></Signin>}></Route>
           <Route path='/signup' element={<Signup register={registerHandle}></Signup>}></Route>
           <Route path='/signin' element ={ isAuth ? <Home/> : <Signin login={loginHandle}></Signin>}></Route>
           {/* <Route path="/wishlist/show" element={ isAuth ? <WishList></WishList> : <Signin login={loginHandle}></Signin>}></Route> */}
         </Routes>
       </div>
       <footer></footer>
     </div>
   )
 }
// function App() {
//   //  return <Home />;
//    return (
//     <div>
//         <CategoryList></CategoryList>
//     </div>
//     )
// }
export default App;