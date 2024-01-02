import React, { useState } from 'react';

export default function CategoryCreateForm(props) {
  const [newCategory, setNewCategory] = useState({});

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    let newValue;

    // Check if the input is for file upload
    if (attributeToChange === 'image' && event.target.files) {
      newValue = event.target.files[0]; // Get the first file
    } else {
      newValue = event.target.value;
    }

    const updatedCategory = { ...newCategory, [attributeToChange]: newValue };
    setNewCategory(updatedCategory);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Submitting form"); // Debugging log

    // Create a FormData object to send the file
    const formData = new FormData();
    Object.keys(newCategory).forEach(key => {
      formData.append(key, newCategory[key]);
    });

    props.addCategory(formData); // Send formData instead of JSON

    setNewCategory({}); // Reset the state
    event.target.reset(); // Reset the form fields
  };

  return (
    <div>
      <h1>Create Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type='text' name='name' onChange={handleChange} value={newCategory.name || ''}></input>
        </div>
        <div>
          <label>Image</label>
          <input type='file' name='image' onChange={handleChange}></input>
        </div>
        <div>
          <input type='submit' value="Add Category"></input>
        </div>
      </form>
    </div>
  );
}
