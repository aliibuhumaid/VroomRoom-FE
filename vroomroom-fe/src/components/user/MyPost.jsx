import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyPost(props) {
  console.log(props.userId.id);
  const [isAdded, setIsAdded] = useState(false);
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    getPosts();
    
  }, []);
  const deletePost = (id) =>{
    Axios.get(`post/delete?id=${id}`)
    .then(res =>{
        console.log("Post Deleted")
    })
    .catch(err =>{
        console.log(err);
    })
}
  const getPosts = () => {
    if (!props.userId.id) return;
    Axios.get(`/post/myPost?user=${props.userId.id}`)
      .then((res) => {
        console.log(res.data);
        setMyPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>MyPost</h1>

      <div className='postHead d-flex justify-content-between align-items-center'>
        {myPost.length > 0 ? (
          myPost.map((post) => (
            <div class='d-flex align-items-center justify-content-center col'>
              <div className='editCard card shadow-sm' style={{ width: '17rem' }}>
                <img src={post.image[0]} className='card-img-top' alt='carImage' width={100} height={250} />
                <div className='editCardBody card-body'>
                  <div class='d-flex justify-content-between align-items-center'>
                    <h5 className='card-title'>{post.title}</h5>
                    {/* <button
                      className={`btn btn-primary ${isAdded && 'btn-success'}`}
                      onClick={() => {
                        setIsAdded(true);
                        post.addWish(post._id);
                      }}
                    >
                      Whishlist {isAdded && 'added'}
                    </button> */}
                  </div>
                  <div class='d-flex justify-content-between align-items-center'>
                    <p className='card-text'>
                      <b>Price: </b>
                      {post.price}
                    </p>
                    <p>
                      <b>Category: </b>
                      {post.category ? post.category.name : 'No Category'}
                    </p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <Link className='btn btn-warning' to={`/post/edit/${post._id}`}>Edit</Link>
                    <button className='btn btn-danger' onClick={() => deletePost(post._id)}>Delete</button>
                  </div>
                  <Link to={`/post/detail/${post._id}`}>
                    <button type='button' className='btn btn-outline-secondary w-100 '>
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
