import React from 'react'
import User from './user'
import Headers from './headers'

const Users = ({ users, onDelete, onToggleBookmark }) => {
  return (
    <>
      {users.length > 0 &&
        <table className='table'>
          <thead>
          <Headers />
          </thead>
          <tbody>
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
          </tbody>
        </table>
      }
    </>
  )
}

export default Users