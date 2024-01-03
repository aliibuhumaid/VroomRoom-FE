import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostDetail(props) {
    const [view, setView] = useState();
    const { id } = useParams();

    useEffect(() => {
        viewPost(id);
    }, [id]);

    const viewPost = (id) => {
        Axios.get(`/post/detail?id=${id}`)
            .then(res => {
                setView(res.data.post);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="container mt-4">
            <h1>Post Detail</h1>
            {view && (
                <div className="card mt-3">
                    {/* Remove maxHeight and objectFit to display the image in its full size */}
                    <img src={view.image[0]} className="card-img-top" alt="Post" />

                    <div className="card-body">
                        <h5 className="card-title">{view.title}</h5>
                        <p className="card-text">{view.description}</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Location:</strong> {view.location}</li>
                            <li className="list-group-item"><strong>Price:</strong> {view.price}</li>
                            <li className="list-group-item"><strong>Category:</strong> {view.category.name}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
