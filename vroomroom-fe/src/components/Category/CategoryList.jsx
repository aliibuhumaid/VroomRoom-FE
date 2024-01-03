import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Category from './Category';
import { Link } from 'react-router-dom';

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCategoryList();
    }, []);

    const loadCategoryList = () => {
        Axios.get("category/index")
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    setError("Categories data is not in expected format or undefined");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load categories.");
            });
    };

    const deleteCategory = (id) => {
        Axios.get(`category/delete?id=${id}`)
            .then(() => {
                console.log("Category Deleted");
                loadCategoryList(); // Reload categories after deletion
            })
            .catch((err) => {
                console.error(err);
                setError("Error deleting category.");
            });
    };

    const addCategory = (category) => {
        Axios.post("category/add", category)
            .then(() => {
                console.log("Category Added. Reloading category list.");
                loadCategoryList();
            })
            .catch((err) => {
                console.error(err);
                setError("Error adding Category.");
            });
    };

    const allCategories = categories.map((category, index) => (
        <div key={index} className="d-flex align-items-center justify-content-center col mb-4">
            <Category {...category} deleteCategory={() => deleteCategory(category._id)} />
        </div>
    ));

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Category List</h1>
                <Link to={'/category/add'} className="btn btn-primary">Add Category</Link>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                {allCategories}
            </div>
        </div>
    );
}
