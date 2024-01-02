import Home from './components/home/Home';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import {Routes, Route, Link} from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
import Axios from 'axios';
import WishList from './components/home/WishList';
import CategoryList from './components/home/CategoryList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from './components/Post/PostList';

function App() {
  //  return <Home />;
  
   return (
    <div>
        <CategoryList></CategoryList>
        <PostList></PostList>
    </div>
    )
}

export default App;
