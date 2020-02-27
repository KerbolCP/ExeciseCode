import React from 'react'

export default function Page3({ match }) {
  return (
    <div>
      <h1>页面三</h1>
      <p>{match.params.username}</p>
    </div>
  )
}
