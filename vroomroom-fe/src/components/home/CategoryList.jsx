import { useEffect, useState } from "react";
import React from 'react';
import Axios from 'axios';
import Category from './Category';
import CategoryCreateForm from "./CategoryCreateForm";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategoryList();
  }, []);

  const loadCategoryList = () => {
    Axios.get("category/index")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load categories.");
      });
  };

  const addCategory = (category) => {
    Axios.post("category/add", category)
      .then(() => {
        loadCategoryList();
      })
      .catch((err) => {
        console.error(err);
        setError("Error adding Category.");
      });
  };

  const allcategories = categories.map((category, index) => (
    <tr key={index}>
      <Category {...category} />
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
          </tr>
          {allcategories}
        </tbody>
      </table>
      <CategoryCreateForm addCategory={addCategory} />
    </div>
  );
}
