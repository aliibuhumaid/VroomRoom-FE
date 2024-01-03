import { useEffect, useState } from "react";
import React from 'react';
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
        console.log("API Response:", response.data); // Debugging log

        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setError("Categories data is not in expected format or undefined");
          setCategories([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load categories.");
        setCategories([]);
      });
  };

  const addCategory = (category) => {
    console.log("Adding Category:", category); // Debugging log

    Axios.post("category/add", category)
      .then(() => {
        console.log("Category Added. Reloading category list."); // Debugging log
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
    </div>
  );
}
