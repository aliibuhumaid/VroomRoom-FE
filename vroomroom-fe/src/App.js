import Home from './components/home/Home';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from 'react-router-dom';
import Axios  from 'axios';
import CategoryList from './components/home/CategoryList';
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
