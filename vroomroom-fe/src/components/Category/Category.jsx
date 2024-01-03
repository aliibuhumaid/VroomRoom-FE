import React from 'react'
import { Link } from 'react-router-dom';

export default function Category(props) {
    return (
        <div class="d-flex align-items-center justify-content-center col">
            <div className="card shadow-sm" style={{ width: '17rem' }}>
                <img src={props.image} className="card-img-top" alt="categoryImage" width={100} height={250}/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <div class="d-flex flex-column align-items-start">
                        <Link to={`/category/edit/${props._id}`}><button type="button" className="btn btn-outline-primary mb-2">Edit</button></Link>
                        <button onClick={() => props.deleteCategory(props._id)} className="btn btn-outline-danger mb-2">Delete</button>
                        <Link to={`/category/detail/id=${props._id}`}><button type="button" className="btn btn-outline-secondary">View</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
