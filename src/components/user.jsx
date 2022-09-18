import React from 'react'
import Bookmark from './bookmark'
import Quality from './quality'

const User = props => {
  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>
          {props.qualities.map(quality => {
            return (
              <Quality key={quality._id} {...quality} />
            )
          })}
        </td>
        <td>
          {props.profession.name}
        </td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate + ' / 5'}</td>
        <td>
          <Bookmark
            id={props._id}
            status={props.bookmark}
            onToggleBookmark={props.onToggleBookmark}
          />
        </td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => props.onDelete(props._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  )
}

export default User