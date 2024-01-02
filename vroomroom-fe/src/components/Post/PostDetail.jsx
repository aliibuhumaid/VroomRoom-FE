import React from 'react'

export default function PostDetail(props) {
    return (
    <>
        <div>
            <h1>Post Detail</h1>
            <p>{props.post.title}</p>
            <p>{props.post.description}</p>
            <p>{props.post.location}</p>
            <p>{props.post.price}</p>
            <img src={props.post.image} alt="Post Image" />
            <p>{props.post.category.name}</p>


        </div>
    </>
    )
}
