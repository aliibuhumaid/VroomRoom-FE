import React from 'react'

export default function Category(props) {
  return (
    <>
      <td>{props.name}</td>
      <td><img src={props.image} width="120" height="120"></img></td>
    </>
  )
}
