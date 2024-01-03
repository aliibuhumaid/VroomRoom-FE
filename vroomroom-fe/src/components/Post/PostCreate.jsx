import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function PostCreate(props) {
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState({});
    const [categories, setCategories] = useState([]);
    const {userId} = useParams();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        Axios.get("/category/index")
            .then(response => {
                setCategories(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const allCategories = categories.map((cate) => (
        <option key={cate._id} value={cate._id}>
            {cate.name}
        </option>
    ));

    const addPost = (post) => {
        Axios.post("/post/add", post)
            .then(res => {
                navigate('/post');
            })
            .catch(err => {
                console.log("Error adding Post", err);
            });
    };

    const handleChange = (event) => {
        const attributeToChange = event.target.name;
        const newValue = event.target.value;
        if (attributeToChange === "image") {
            const files = event.target.files;
            setNewPost(prevState => ({
                ...prevState,
                image: files
            }));
        } else {
            setNewPost(prevState => ({
                ...prevState,
                [attributeToChange]: newValue
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        Object.keys(newPost).forEach(key => {
            if (key === 'image') {
                for (let i = 0; i < newPost.image.length; i++) {
                    formData.append('image', newPost.image[i]);
                }
            } else {
                formData.append(key, newPost[key]);
            }
        });

        formData.append('user', userId);
        addPost(formData);
    };

    return (
        <div className="container mt-4">
            <h1>Add Post</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" name="description" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Location:</label>
                        <input type="text" name="location" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="text" name="price" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" name="image" onChange={handleChange} multiple required/>
                    </div>
                    <div>
                        <label>Category:</label>
                        <select name="category" onChange={handleChange} required>
                            <option>Select a Category</option>
                            {allCategories}
                        </select>                    
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}
