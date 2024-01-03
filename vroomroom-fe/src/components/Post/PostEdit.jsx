import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function PostEdit(props) {
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [categories, setCategories] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        editView(id);
        loadCategories();
    }, [id]);

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
        <option key={cate._id} value={cate._id} selected={post.category === cate._id}>
            {cate.name}
        </option>
    ));

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: files ? files : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(post).forEach(key => {
            if (key === 'image') {
                for (let i = 0; i < post.image.length; i++) {
                    formData.append('image', post.image[i]);
                }
            } else {
                formData.append(key, post[key]);
            }
        });

        updatePost(formData);
    };

    const editView = (id) => {
        Axios.get(`/post/edit?id=${id}`)
            .then(res => {
                const postData = res.data.post;
                postData.category = postData.category._id;
                setPost(postData);
            })
            .catch(err => {
                console.log("Error loading post information", err);
            });
    };

    const updatePost = (postData) => {
        Axios.post("/post/edit", postData)
            .then(() => {
                navigate('/post');
            })
            .catch(err => {
                console.log("Error updating Post", err);
            });
    };

    return (
        <div className="container mt-4">
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" name="title" value={post.title || ''} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input type="text" className="form-control" id="description" name="description" value={post.description || ''} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input type="text" className="form-control" id="location" name="location" value={post.location || ''} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price:</label>
                    <input type="text" className="form-control" id="price" name="price" value={post.price || ''} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input type="file" className="form-control" id="image" name="image" onChange={handleChange} multiple/>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <select className="form-select" id="category" name="category" onChange={handleChange} required>
                        {allCategories}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Post</button>
            </form>
        </div>
    );
}
