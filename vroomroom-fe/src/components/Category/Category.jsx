import React from 'react';
import { Link } from 'react-router-dom';

export default function Category(props) {
    return (
        <div className="d-flex align-items-center justify-content-center col">
            <div className="card shadow-sm" style={{ width: '17rem' }}>
                <img src={props.image} className="card-img-top" alt="categoryImage" width={100} height={250}/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    {props.admin === "admin" && <>
                    <div className="row">
                        <div className="col-6">
                            <Link to={`/category/edit/${props._id}`}>
                                <button type="button" className="btn btn-outline-primary w-100 mb-2">Edit</button>
                            </Link>
                        </div>
                        <div className="col-6">
                            <button onClick={() => props.deleteCategory(props._id)} className="btn btn-outline-danger w-100 mb-2">Delete</button>
                        </div>
                    </div>
                    </>}
                    <div className="row">
                        <div className="col-12">
                        <Link to={`/category/posts/${props._id}`}>
                            <button type="button" className="btn btn-outline-secondary w-100">View</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
