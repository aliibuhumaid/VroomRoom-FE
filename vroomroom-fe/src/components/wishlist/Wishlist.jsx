import React, { useState } from 'react'

export default function Wishlist(props) {
    const handleSubmit = (event, postId, wishId) => {
        console.log(postId, wishId)
        event.preventDefault();
        console.log("here")
        const deleteInfo = {
            postId,
            wishId
        };
        props.wishDelete(deleteInfo);
    }
    return (
        <>
            {props.wishlist.map((wish, index) => (<div key={index}>
                {wish.post.map(onePost => <ul key={onePost._id}>
                    <li >{onePost.title}</li>
                    <li >{onePost.price}</li>
                    <li ><img src={onePost.image[0]} alt="carImage" /></li>
                    <li >{onePost.category.name}</li>
                    <form onSubmit={(e) => handleSubmit(e, onePost._id, wish._id)}>
                        <li><button type='submit'>Delete</button></li>
                    </form>
                    <hr />
                </ul>)}
                <hr />
            </div>))}
            {/* props.wishlist[0].post.map(onePost => (
            <ul key={onePost._id}>
                 <li >{onePost.title}</li>
                 <li >{onePost.price}</li>
                 <li ><img src={onePost.image[0]} alt="carImage" /></li>
                 <li >{onePost.category.name}</li>
                 <form onSubmit={(e)=>handleSubmit(e,onePost._id,props.wishlist._id)}>
                     <li><button type='submit'>Delete</button></li>
                 </form>
                 <hr />
                 </ul>
        ))} */}
            {/* // post.map((onePost, index) => ( */}

        </>
    )
}

// {props.wishlist.map(post =>Array.isArray(post) &post.map(onePost=>
//     <ul key={onePost._id}>
//     <li >{onePost.title}</li>
//     <li >{onePost.price}</li>
//     <li ><img src={onePost.image[0]} alt="carImage" /></li>
//     <li >{onePost.category.name}</li>
//     <form onSubmit={(e)=>handleSubmit(e,onePost._id,props.wishlist._id)}>
//         <li><button type='submit'>Delete</button></li>
//     </form>
//     <hr />
//     </ul>

// ))