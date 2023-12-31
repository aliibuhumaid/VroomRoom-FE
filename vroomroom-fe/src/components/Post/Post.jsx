import React from 'react'

export default function Post(props) {
    return (
            <>
            <li>Title: {props.title}</li>
            <li>Description: {props.description}</li>
            <li>Location {props.location}</li>
            <li>Price {props.price}</li>
            <li><img src={props.image} alt="carImage" /></li>
            <li>Category: {props.category.name}</li>
            </>
    )
}

            
{/* <p>Title: {props.title}</p>
<p>Description: {props.description}</p>
<p>Location {props.location}</p>
<p>Price {props.price}</p>
<p>Image: {props.title}</p>
<p>Category: {props.category}</p> */}
