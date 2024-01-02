import React, { useState } from 'react'

export default function PostEdit(props) {
    const [post, setPost] = useState(props.post)

    const handleChange = (event) =>{
        const attributeToChange = event.target.name;
        const newValue = event.target.value;
        const updatedPost = {...post};
        updatedPost[attributeToChange] = newValue;
        console.log(updatedPost);
        setPost(updatedPost);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        props.updatePost(post);
        console.log(post);
    } 

    return (
        <div>
            <h1>Post Edit</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" onChange={handleChange} value={post.title}/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" name="description" onChange={handleChange} value={post.description}/>
                    </div>
                    <div>
                        <label>Location:</label>
                        <input type="text" name="location" onChange={handleChange} value={post.location}/>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="text" name="price" onChange={handleChange} value={post.price}/>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={handleChange} name="image" />
                    </div>
                    <div>
                        <label>Category:</label>
                        {console.log(post.category.name)}
                        <select onChange={handleChange} name="category">
                            {props.categories.map((cate) => (
                                cate.name == post.category.name ? (
                                    <option key={cate._id} value={cate._id} selected>
                                        {cate.name}
                                    </option>
                                ) : (
                                    <option key={cate._id} value={cate._id}>
                                        {cate.name}
                                    </option>
                                )
                            ))}
                        </select>
                    </div>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </div>    )
}
