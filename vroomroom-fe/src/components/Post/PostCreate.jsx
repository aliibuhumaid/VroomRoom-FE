import React from 'react'
import { useState } from 'react'

export default function PostCreate(props) {

    const [newPost, setNewPost] = useState({})

    const handleChange = (event) =>{
        const attributeToChange = event.target.name;
        let newValue = event.target.value;
        const post = {...newPost};
        if(attributeToChange == "image"){
            console.log(newValue);
            const file = event.target.files;
            console.log(file);
            let allImages =[];
            let count = 0;
            console.log(file[0])
            for(let i=0; i<file.length; i++){
                allImages.push(file[i]);
            }
            console.log(allImages)
            post[attributeToChange] = allImages;
            setNewPost(post)
        }
        else{
            post[attributeToChange] = newValue;
            console.log(post);
            setNewPost(post);
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', newPost.title);
        formData.append('description', newPost.description);
        formData.append('location', newPost.location);
        formData.append('price', newPost.price);
        formData.append('category', newPost.category);
        for (let i = 0; i < 2; i++) {
            formData.append('image', newPost.image[i])
         }
        console.log(formData);
        console.log(newPost);
        props.addPost(formData);
        console.log(newPost);
        event.target.reset()
    } 

    return (
        <div>
            <h1>Add Post</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" name="description" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Location:</label>
                        <input type="text" name="location" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="text" name="price" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" name="image" onChange={handleChange} multiple required/>
                    </div>
                    <div>
                        <label>Category:</label>
                        <select name="category" onChange={handleChange} required>
                            <option>Select a Category</option>
                            {props.categories}
                        </select>                    
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>

    )
}
