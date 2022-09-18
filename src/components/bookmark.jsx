import React from 'react'

const Bookmark = ({ status, onToggleBookmark, id }) => {
  return (
    <button
      className={`bi ${status ? 'bi-bookmark-star-fill' : 'bi-bookmark'}`}
      onClick={() => onToggleBookmark(id)}
    >
    </button>
  )
}

export default Bookmark