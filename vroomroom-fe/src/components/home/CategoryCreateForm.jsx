import React, { useState } from 'react'

export default function CategoryCreateForm(props) {

  const [newCategory, setNewCategory] = useState({});

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const category = {...newCategory}
    category[attributeToChange] = newValue;
    console.log(category);
    setNewCategory(category);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addCategory(newCategory);
    event.target.reset();
  }

  return (
    <div>
      <h1> Create Category </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type='text' name='name' onChange={handleChange}></input>
        </div>

        <div>
          <label>Image</label>
          <input type='email' name='image' onChange={handleChange}></input>
        </div>

        <div>
          <input type='submit' value="Add Category"></input>
        </div>
      </form>
    </div>
  )
}
