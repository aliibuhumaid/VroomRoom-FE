import React from 'react'

export default function Post(props) {
    return (
            <>
            <td>{props.title}</td>
            <td>{props.description}</td>
            <td>{props.location}</td>
            <td>{props.price}</td>
            <td><img src={props.image} alt="carImage" /></td>
            <td>{props.category.name}</td>
            <td><button onClick={() => props.editView(props._id)}>Edit</button></td>
            </>
    )
}

            
{/* <p>Title: {props.title}</p>
<p>Description: {props.description}</p>
<p>Location {props.location}</p>
<p>Price {props.price}</p>
<p>Image: {props.title}</p>
<p>Category: {props.category}</p> */}
