import React from 'react'

export default function Post(props) {
    return (
            <>
            <td>{props.title}</td>
            <td>{props.price}</td>
            <td><img src={props.image[0]} alt="carImage" /></td>
            {console.log(props.image)}
            <td>{props.category.name}</td>
            <td><button onClick={() => props.editView(props._id)}>Edit</button></td>
            <td><button onClick={() => props.deletePost(props._id)}>Delete</button></td>
            <td><button onClick={() => props.viewPost(props._id)}>View</button></td>
            </>
    )
}

            
{/* <p>Title: {props.title}</p>
<p>Description: {props.description}</p>
<p>Location {props.location}</p>
<p>Price {props.price}</p>
<p>Image: {props.title}</p>
<p>Category: {props.category}</p> */}
