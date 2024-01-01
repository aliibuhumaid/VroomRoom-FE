import React, { useEffect } from 'react';
import Post from './Post';
import {useState} from 'react';
import Axios from 'axios';
import PostCreate from './PostCreate';
import PostEdit from './PostEdit';
export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentPost, setCurrentPost] = useState({})
    useEffect(() =>{
        loadPosts()
        loadCategories()
    }, [])
    const loadPosts = () =>{
        Axios.get("post/index")
        .then(response =>{
            // console.log(response)
            setPosts(response.data.post);
            // console.log(response.data.post)
        })
        .catch(err =>{
            console.log(err);
        })
    }
    const loadCategories = () =>{
        Axios.get("category/index")
        .then(response =>{
            console.log(response.data);
            setCategories(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }
    const editView = (id) =>{
        Axios.get(`post/edit?id=${id}`)
        .then((res) =>{
            console.log(res.data.post);
            console.log('Loaded Post Information');
            let post = res.data.post;
            setIsEdit(true);
            setCurrentPost([post]);
        })
        .catch(err =>{
            console.log("Error loading author information");
            console.log(err);
        })
    }
    const addPost = (post) =>{
        Axios.post("post/add", post)
        .then(res =>{
            console.log("Post Added successfully!!!")
            loadPosts();
        })
        .catch(err =>{
            console.log("Error adding Post")
            console.log(err);
        })
    }
    const allPosts = posts.map((post, index) =>(
        // console.log('working');
        <tr key={index}>
            <Post {...post} editView={editView} ></Post>
            <hr />
        </tr>
    ))

    const allCategories = categories.map((cate) => (
        <option key={cate._id} value={cate._id}>
            {cate.name}
        </option>
    ))


    
    return (
        <div>
            <h2>PostList</h2>
            <tr>
                <td>Title</td>
                <td>Description</td>
                <td>Location</td>
                <td>Price</td>
                <td>Image</td>
                <td>Category</td>
                <td>Edit</td>
            </tr>
            {allPosts}
            {(!isEdit) ? 
            <PostCreate addPost={addPost} categories={allCategories}></PostCreate>
            :
            <PostEdit categories={allCategories}></PostEdit>
            }
        </div>
    )
}
