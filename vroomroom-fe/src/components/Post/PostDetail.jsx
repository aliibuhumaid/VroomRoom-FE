import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function PostDetail(props) {
    const [view, setView] = useState();
    const {id} = useParams();
    // console.log(id)
    // console.log("I am here")
    useEffect(() =>{
        // console.log("dddddd")
        viewPost(id);
    },[])

    const viewPost =(id) =>{
        console.log(id);
        Axios.get(`/post/detail?id=${id}`)
        .then(res =>{
            console.log(res.data.post);
            setView(res.data.post);
        })
        .catch(err =>{
            console.log(err);
        })
    
    }
    return (
    <>
        <div>
        <h1>Post Detail</h1>
                {view && (
                    <>
                        <p>{view.title}</p>
                        <p>{view.description}</p>
                        <p>{view.location}</p>
                        <p>{view.price}</p>
                        <img src={view.image} alt="Post Image" />
                        <p>{view.category.name}</p>
                    </>
                )}
            
        </div>
    </>
    )
}
