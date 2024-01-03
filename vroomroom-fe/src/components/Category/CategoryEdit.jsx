// CategoryEdit.jsx
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoryEdit() {
    const navigate = useNavigate();
    const [category, setCategory] = useState({ name: '', image: null });
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadCategory(id);
        }
    }, [id]);

    const loadCategory = (id) => {
        Axios.get(`/category/detail?id=${id}`) // Make sure this matches your API endpoint
            .then(response => {
                if (response.data && response.data.category) {
                    setCategory({
                        name: response.data.category.name,
                        image: response.data.category.image // Assuming image URL comes in the response
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
        } else {
            formData.append('currentImage', category.image); // Pass current image URL if new image not uploaded
        }

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
                        value={category.name || ''}
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
                    {category.image && !category.image instanceof File && (
                        <div>
                            <p>Current Image:</p>
                            <img src={category.image} alt="Category" style={{ width: '100px', height: '100px' }}/>
                        </div>
                    )}
                </div>
                <button type="submit">Edit Category</button>
            </form>
        </div>
    );
}
