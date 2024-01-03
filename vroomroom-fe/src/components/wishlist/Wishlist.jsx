import React from 'react';

export default function Wishlist(props) {
    const handleSubmit = (event, postId, wishId) => {
        event.preventDefault();
        const deleteInfo = {
            postId,
            wishId
        };
        props.wishDelete(deleteInfo);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {props.wishlist.map((wish, index) => (
                    wish.post.map(onePost => (
                        <div key={onePost._id} className="col-md-4 mb-4">
                            <div className="card">
                                {/* Image adjusted to fit within the card */}
                                <img src={onePost.image[0]} className="card-img-top" alt="carImage" style={{ height: '150px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{onePost.title}</h5>
                                    <p className="card-text"><strong>Price:</strong> {onePost.price}</p>
                                    <p className="card-text"><strong>Category:</strong> {onePost.category.name}</p>
                                    <form onSubmit={(e) => handleSubmit(e, onePost._id, wish._id)}>
                                        <button type='submit' className="btn btn-danger btn-sm">Delete from Wishlist</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
}
