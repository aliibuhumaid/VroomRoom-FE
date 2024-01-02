import { useEffect, useState } from "react"
import React from 'react'
import Axios from 'axios'
import Category from './Category'
import CategoryCreateForm from "./CategoryCreateForm";

export default function CategoryList() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Call API
    loadCategoryList()
  }, [])

  const loadCategoryList = () => {
    Axios.get("category/index")
    .then((response) => {
      // console.log(response)
      setCategories(response.data.categories)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const addCategory = (category) => {
    Axios.post("category/add", category)
    .then( res => {
      console.log("Category Added successfully!");
      loadCategoryList();
    })
    .catch( err => {
      console.log("Error adding Category!");
      console.log(err);
    })
  }
  

//   const allcategories = categories.map((category, index) => (
//     <tr key={index}>
//       <Category {...category}/>
//     </tr>
//   ))
  const allcategories = categories && categories.map((category, index) => (
    <tr key={index}>
      <Category {...category}/>
    </tr>
  ));

  

  return (
    <div>
      <h1>Category List</h1>
      <div>
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
      <CategoryCreateForm addCategory = {addCategory}></CategoryCreateForm>
      </div>
  )
}
