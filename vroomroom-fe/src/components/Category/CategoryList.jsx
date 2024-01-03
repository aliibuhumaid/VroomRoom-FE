import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Category from './Category';
import CategoryCreate from "./CategoryCreate";

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

    const allcategories = categories.map((category, index) => (
        <tr key={index}>
            <Category {...category} deleteCategory={() => deleteCategory(category._id)} />
        </tr>
    ));

    return (
        <div>
            <h1>Category List</h1>
            {error && <p>Error: {error}</p>}
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th> {/* Add a column for actions like delete */}
                    </tr>
                    {allcategories}
                </tbody>
            </table>
        </div>
    );
}
