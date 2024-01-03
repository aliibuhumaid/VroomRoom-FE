import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState({});

    const addCategory = (category) => {
        Axios.post("/category/add", category)
        .then(res => {
            console.log("Category Added successfully!!!");
            navigate('/category');
        })
        .catch(err => {
            console.log("Error adding Category");
            console.log(err);
        });
    };

    const handleChange = (event) => {
        const attributeToChange = event.target.name;
        let newValue = event.target.value;

        if(attributeToChange === "image"){
            const file = event.target.files[0];
            setNewCategory(prevState => ({
                ...prevState,
                [attributeToChange]: file
            }));
        } else {
            setNewCategory(prevState => ({
                ...prevState,
                [attributeToChange]: newValue
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        Object.keys(newCategory).forEach(key => {
            formData.append(key, newCategory[key]);
        });

        addCategory(formData);
    };

    return (
        <div>
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={handleChange} required/>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleChange} required/>
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
}
