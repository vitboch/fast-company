import React, { useState } from 'react'
import api from './api'
import SearchStatus from './components/searchStatus'
import Users from './components/users'

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
      <Users users={users} onDelete={handleDelete} onToggleBookmark={handleToggleBookmark} />
    </>
  )
}

export default App