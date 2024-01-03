import React, { useEffect, useState } from 'react'
import Wishlist from './Wishlist';
import Axios from 'axios'

export default function WishlistList(props) {
    const [wishlists, setWishlists] = useState([]);
    useEffect(() => {
        loadWishelists();
    },[])
    // console.log(wishlists)
    console.log(props.userId.id)
    
    const loadWishelists = () =>{
        if(!props.userId.id) return
        Axios.get(`wishlist/show?id=${props.userId.id}`)
        .then(response =>{
            console.log('My response:',response.data.wish)
            setWishlists(response.data.wish);
            console.log(response.data)
        })
        .catch(err =>{
            console.log(err);
        })
    }

    
    // const allWishlists = wishlists.map((wishlist, index) =>(
    //     // console.log('working');
    //     <tr key={index}>
    //         <Wishlist {...wishlist}></Wishlist>
    //         <hr />
    //     </tr>
    // ))

    const wishDelete = (wish) =>{
        console.log(wish)
        Axios.post('wishlist/delete', wish)
        .then(res =>{
            console.log("wish Deleted")
            loadWishelists();
        })
        .catch(err =>{
            console.log(err);
        })    
    }

    // const allWishlists = <Wishlist postWish={postWish} wishlist={wishlists} wishDelete={wishDelete}></Wishlist>
        
        return (
        <div><br /> <br />
            <h1>
                <wishlist></wishlist>
            </h1>
        {/*
            <ul>
                {allWishlists}
            </ul>
        */}
        <Wishlist  wishlist={wishlists} wishDelete={wishDelete}></Wishlist>
        </div>
    )
}
