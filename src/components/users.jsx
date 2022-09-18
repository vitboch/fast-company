import React from 'react'
import User from './user'

const Users = ({ users, onDelete, onToggleBookmark }) => {
  return (
    <>
      {users.map(user => {
        return (
          <User
            key={user._id}
            {...user}
            onDelete={onDelete}
            onToggleBookmark={onToggleBookmark}
          />
        )
      })}
    </>
  )
}

export default Users