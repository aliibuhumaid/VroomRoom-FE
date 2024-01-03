import React from 'react'
import {Link} from 'react-router-dom';
export default function Post(props) {
    console.log(props.userId);
    return (<>
    <div class="col">
            <div className="card shadow-sm" style={{ width: '18rem' }}>
                <img src={props.image[0]} className="card-img-top" alt="carImage"/>
                <div className="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{props.title}</h5>
                        <button onClick={() => props.addWish(props._id)}>Add to Whishlist</button>
                    </div>
                    <p className="card-text"><b>Price: </b>{props.price}</p>
                    {props.category ? props.category.name : 'No Category'}            {/* <button onClick={() => props.editView(props._id)}>Edit</button> */}
                    <Link to={`/post/edit/${props._id}`}>Edit</Link>
                    <button onClick={() => props.deletePost(props._id)}>Delete</button>
                    <Link to={`/post/detail/${props._id}`}>View</Link>
                </div>
            </div>
    </div>
            </>
    )
}

            
{/* <p>Title: {props.title}</p>
<p>Description: {props.description}</p>
<p>Location {props.location}</p>
<p>Price {props.price}</p>
<p>Image: {props.title}</p>
<p>Category: {props.category}</p> */}
