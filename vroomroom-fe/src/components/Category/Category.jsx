import React from 'react'
import {Link} from 'react-router-dom';

export default function Category(props) {
  return (
    <>
      <td>{props.name}</td>
      <td><img src={props.image} width="120" height="120"></img></td>
      <td><Link to={`/post/edit/${props._id}`}>Edit</Link></td>
      <td><button onClick={() => props.deletePost(props._id)}>Delete</button></td>
      <td><button onClick={() => props.viewPost(props._id)}>View</button></td>
      <td><Link to={`/post/detail/id=${props._id}`}>View</Link></td>
      <Link to={'/post/add'}>Add</Link>
    </>
  )
}
