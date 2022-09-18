import React, { useState } from 'react'
import api from './api'
import SearchStatus from './components/searchStatus'
import Users from './components/users'
import headers from './assets/headers'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll)
  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId))
  }
  const handleToggleBookmark = userId => {
    setUsers(users.map(user => user._id === userId
        ? { ...user, bookmark: !user.bookmark } : user,
      ),
    )
  }

  return (
    <>
      <SearchStatus totalUsers={users.length} />
      {users.length > 0 &&
        <table className='table'>
          <thead>
          <tr>
            {headers.map(header => <th scope='col' key={header.id}>{header.title}</th>)}
          </tr>
          </thead>
          <tbody>
          <Users users={users} onDelete={handleDelete} onToggleBookmark={handleToggleBookmark} />
          </tbody>
        </table>
      }
    </>
  )
}

export default App