import React, {useState} from 'react'
import {Link} from 'react-router-dom';
export default function Post(props) {
    const [isAdded, setIsAdded] = useState(false)
    console.log(props.userId);
    return (<>
    <div class="d-flex align-items-center justify-content-center col">
            <div className="editCard card shadow-sm" style={{ width: '17rem' }}>
                <img src={props.image[0]} className="card-img-top" alt="carImage" width={100} height={250}/>
                <div className="editCardBody card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{props.title}</h5>
                        <button className={`btn btn-primary ${isAdded && 'btn-success'}`} onClick={() => {setIsAdded(true);props.addWish(props._id)}}>Whishlist {isAdded && "added"}</button>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p className="card-text"><b>Price: </b>{props.price}</p>
                        <p><b>Category: </b>{props.category ? props.category.name : 'No Category'}</p>          
                    </div>
                     {/* <button onClick={() => props.editView(props._id)}>Edit</button> */}
                    {/* <Link to={`/post/edit/${props._id}`}>Edit</Link>
                    <button onClick={() => props.deletePost(props._id)}>Delete</button> */}
                    <Link to={`/post/detail/${props._id}`}><button type="button" className="btn btn-outline-secondary w-100 ">View</button></Link>
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
