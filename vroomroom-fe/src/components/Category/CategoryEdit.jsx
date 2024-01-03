// CategoryEdit.jsx
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoryEdit() {
    const navigate = useNavigate();
    const [category, setCategory] = useState({ name: '', image: null });
    const { id } = useParams(); // Make sure this matches the URL param name

    useEffect(() => {
        if (id) {
            loadCategory(id);
        }
    }, [id]);

    const loadCategory = (id) => {
        Axios.get(`/category/edit/${id}`) // Adjusted to match RESTful URL structure
            .then(response => {
                if (response.data && response.data.name) {
                    setCategory({
                        name: response.data.name,
                        // Image is not set here as it's a file input
                    });
                } else {
                    console.log("No category data received");
                }
            })
            .catch(err => {
                console.log("Error loading category information", err);
            });
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setCategory(prevCategory => ({
            ...prevCategory,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('name', category.name);
        if (category.image instanceof File) {
            formData.append('image', category.image);
        }

        updateCategory(formData, id);
    };

    const updateCategory = (formData, id) => {
        Axios.post(`/category/edit/${id}`, formData)
            .then(() => {
                navigate('/category');
            })
            .catch(err => {
                console.log("Error updating category", err);
            });
    };

    return (
        <div>
            <h1>Category Edit</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        value={category.name}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleChange}
                    />
                    {category.image && <p>Current Image: [File selected]</p>}
                </div>
                <button type="submit">Edit Category</button>
            </form>
        </div>
    );
}
