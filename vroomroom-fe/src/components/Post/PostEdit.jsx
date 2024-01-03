import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function PostEdit(props) {
    const navigate = useNavigate();
    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([]);
    const {id} = useParams();
console.log(id)
    useEffect(() =>{
        editView(id);
        loadCategories()

    },[])
    const loadCategories = () =>{
        Axios.get("/category/index")
        .then(response =>{
            console.log(response.data);
            setCategories(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }
    const allCategories = categories.map((cate) => (
        <option key={cate._id} value={cate._id}>
            {cate.name}
        </option>
    ))
    const handleChange = (event) =>{
        const attributeToChange = event.target.name;
        const newValue = event.target.value;
        const updatedPost = {...post};
        if(attributeToChange == "image"){
            console.log(newValue);
            const file = event.target.files;
            console.log(file);
            let allImages =[];
            console.log(file[0])
            for(let i=0; i<file.length; i++){
                allImages.push(file[i]);
            }
            console.log(allImages)
            updatedPost[attributeToChange] = allImages;
            setPost(updatedPost)
        }
        else{
            updatedPost[attributeToChange] = newValue;
            console.log(updatedPost);
            setPost(updatedPost);
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('_id', post._id);
        formData.append('title', post.title);
        formData.append('description', post.description);
        formData.append('location', post.location);
        formData.append('price', post.price);
        formData.append('category', post.category);
        for (let i = 0; i < post.image.length; i++) {
            formData.append('image', post.image[i])
         }
        console.log(formData);
        console.log(post);
        updatePost(formData);
        console.log(post);

    } 

    const editView = (id) =>{
        console.log(id)
        Axios.get(`/post/edit?id=${id}`)
        .then((res) =>{
            console.log("iiiiiii");
            console.log(res.data.post);
            console.log('Loaded Post Information');
            let post = res.data.post;
            post.category = post.category._id;
            console.log(post)
            setPost(post);
        })
        .catch(err =>{
            console.log("Error loading author information");
            console.log(err);
        })
    }

    const updatePost = (post) =>{
        console.log(post);

        Axios.post("/post/edit", post)
        .then(res =>{
            console.log("Post Updated successfully!!!")
            navigate('/post')
        })
        .catch(err =>{
            console.log("Error updating Post")
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Post Edit</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" onChange={handleChange} value={post.title}/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" name="description" onChange={handleChange} value={post.description}/>
                    </div>
                    <div>
                        <label>Location:</label>
                        <input type="text" name="location" onChange={handleChange} value={post.location}/>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="text" name="price" onChange={handleChange} value={post.price}/>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={handleChange} name="image" multiple/>
                    </div>
                    <div>
                        <label>Category:</label>
                        <select onChange={handleChange} name="category">
                            {categories.map((cate) => (
                                <option
                                    key={cate._id}
                                    value={cate._id}
                                    selected={post.category && cate._id === post.category}
                                >
                                    {cate.name}
                                </option>
                            ))}
                        </select>
                    </div>                    
                    <button type="submit">Edit</button>
                </form>
            </div>
        </div>    )
}
