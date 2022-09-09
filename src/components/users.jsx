import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll)
  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId))
  }
  const renderPhrase = number => {
    const data = {
      0: 'Никто с тобой не тусанет',
      1: ' человека тусанут с тобой сегодня',
      2: ' человек тусанет с тобой сегодня',
      color: { 0: 'danger', 1: 'primary' },
    }
    let color
    let answer
    number < 1 ? color = data.color['0'] : color = data.color['1']
    number < 1 ? answer = data['0']
      : number > 1 && number < 5 ? answer = number + data['1']
        : answer = number + data['2']

    return <span className={'fs-3 badge bg-' + color}>{answer}</span>
  }

  const headers = ['Имя', 'Качества', 'Проффессия', 'Встретился, раз', 'Оценка', '']

  return (
    <>
      {renderPhrase(users.length)}
      {users.length > 0 && (
        <table className='table'>
          <thead>
          <tr>
            {headers.map(header => <th scope='col'>{header}</th>)}
          </tr>
          </thead>
          <tbody>
          {users.map(user => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map(quality => {
                    return (
                      <span
                        key={quality._id}
                        className={'m-1 badge bg-' + quality.color}
                      >
                        {quality.name}
                      </span>
                    )
                  })}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate + ' / 5'}</td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users