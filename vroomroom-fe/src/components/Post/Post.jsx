import React from 'react'
import {Link} from 'react-router-dom';
export default function Post(props) {
    return (<>
            <>
            <td>{props.title}</td>
            <td>{props.price}</td>
            <td><img src={props.image[0]} alt="carImage" width="120" height="120"/></td>
            {/* {console.log(props.image)} */}
            <td>{props.category ? props.category.name : 'No Category'}</td>            {/* <td><button onClick={() => props.editView(props._id)}>Edit</button></td> */}
            <td><Link to={`/post/edit/${props._id}`}>Edit</Link></td>
            <td><button onClick={() => props.deletePost(props._id)}>Delete</button></td>
            <td><button onClick={() => props.viewPost(props._id)}>View</button></td>
            <td><Link to={`/post/detail/id=${props._id}`}>View</Link></td>
            </>
            <Link to={'/post/add'}>Add</Link>
            </>
    )
}

            
{/* <p>Title: {props.title}</p>
<p>Description: {props.description}</p>
<p>Location {props.location}</p>
<p>Price {props.price}</p>
<p>Image: {props.title}</p>
<p>Category: {props.category}</p> */}
