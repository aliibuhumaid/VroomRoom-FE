import React from 'react'
import {Link} from 'react-router-dom';

export default function Category(props) {
  return (
    <>
      <td>{props.name}</td>
      <td><img src={props.image} width="120" height="120"></img></td>
      <td><Link to={`/category/edit/${props._id}`}>Edit</Link></td>
      <td><button onClick={() => props.deleteCategory(props._id)}>Delete</button></td>
      <td><button onClick={() => props.viewCategory(props._id)}>View</button></td>
      <td><Link to={`/category/detail/id=${props._id}`}>View</Link></td>
      <Link to={'/category/add'}>Add</Link>
    </>
  )
}
