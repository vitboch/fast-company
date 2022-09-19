import React from 'react'
import User from './user'
import headers from '../assets/headers'

const Users = ({ users, onDelete, onToggleBookmark }) => {
  return (
    <>
      {users.length > 0 &&
        <table className='table'>
          <thead>
          <tr>
            {headers.map(header => <th scope='col' key={header.id}>{header.title}</th>)}
          </tr>
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