import React from 'react'

export default function Category(props) {
  return (
    <>
      <td>{props.name}</td>
      <td><img src={props.image} width="120" height="120"></img></td>
      <td><button onClick={() => props.editView(props._id)}>Edit</button></td>
      <td><button onClick={() => props.deletePost(props._id)}>Delete</button></td>
      <td><button onClick={() => props.viewPost(props._id)}>View</button></td>
    </>
  )
}
