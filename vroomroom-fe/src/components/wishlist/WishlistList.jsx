import React, { useEffect, useState } from 'react';
import Wishlist from './Wishlist';
import Axios from 'axios';

export default function WishlistList(props) {
    const [wishlists, setWishlists] = useState([]);

    useEffect(() => {
        loadWishlists();
    }, [props.userId.id]); // React to changes in userId

    const loadWishlists = () => {
        if (!props.userId.id) return;
        Axios.get(`wishlist/show?id=${props.userId.id}`)
            .then(response => {
                setWishlists(response.data.wish);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const wishDelete = (wish) => {
        Axios.post('wishlist/delete', wish)
            .then(() => {
                loadWishlists(); // Reload wishlists after deletion
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Your Wishlist</h1>
            {wishlists.length > 0 ? (
                <Wishlist wishlist={wishlists} wishDelete={wishDelete} />
            ) : (
                <p className="text-center">You have no items in your wishlist.</p>
            )}
        </div>
    );
}
