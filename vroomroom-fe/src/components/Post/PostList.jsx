import React, { useEffect } from 'react';
import Post from './Post';
import {useState} from 'react';
import Axios from 'axios';
export default function PostList() {
    const [posts, setPosts] = useState([]);
    useEffect(() =>{
        loadPosts()
    }, [])
    const loadPosts = () =>{
        Axios.get("post/index")
        .then(response =>{
            // console.log(response)
            setPosts(response.data.post);
            console.log(response.data.post)
        })
        .catch(err =>{
            console.log(err);
        })
    }
    const allPosts = posts.map((post, index) =>(
        // console.log('working');
        <ul key={index}>
            <Post {...post}></Post>
            <hr />
        </ul>
    ))
    return (
        <div>
            <h2>PostList</h2>
            {allPosts}
        </div>
    )
}
