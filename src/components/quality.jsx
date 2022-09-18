import React from 'react'

const Quality = ({ color, name, _id }) =>
  <span className={'m-1 badge bg-' + color}>{name}</span>

export default Quality