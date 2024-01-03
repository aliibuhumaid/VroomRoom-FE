import React from "react";
import PostList from "../Post/PostList";
import CategoryList from "../Category/CategoryList";
import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';






export default function Home(props) {
  return (
    <div>
                
    <main>
    <div className="topG backImg">
        <div className="col-md-6 px-0">
          <h1 className="display-4 fst-italic text-white ">you can find many buyers in our platform</h1>
          <p className="lead my-3 text-white">post an ad of your vehicle in our platform for free </p>
          <Link to="/post/add/:userId" className="text-white fw-bold">Post Now</Link>
        </div>
      </div>

       <div>
        <CategoryList>
        </CategoryList>

       </div>

    </main>

    </div>
  )
}


