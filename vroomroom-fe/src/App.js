import Home from './components/home/Home';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from 'react-router-dom';
import Axios  from 'axios';
import CategoryList from './components/home/CategoryList';

function App() {
   return <Home />;
  
    <div>
      <Routes>
        <Route path="/" element={ isAuth ? <AuthorList></AuthorList> : <Signin login={loginHandler}></Signin>}></Route>
      </Routes>
    </div>
}

export default App;
