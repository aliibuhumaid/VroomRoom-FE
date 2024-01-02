import React from 'react';

const Wishlist = ({ wishlist, removeFromWishlist }) => {
    return (
        <div>
            <h2>Wishlist</h2>
            <ul>
                {wishlist.map((post, index) => (
                    <li key={index}>
                        {post.title} {/* Assuming 'title' is a property of each item in the wishlist */}
                        <button onClick={() => removeFromWishlist(post.id)}>
                            Remove from Wishlist
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;