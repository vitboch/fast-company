import React from 'react'

const Headers = () => {
	const data = [
		{ id: 0, title: 'Имя' },
		{ id: 1, title: 'Качества' },
		{ id: 2, title: 'Проффессия' },
		{ id: 3, title: 'Встретился, раз' },
		{ id: 4, title: 'Оценка' },
		{ id: 5, title: 'Избранное' },
		{ id: 6, title: ' ' }
	]
	return (
		<tr>
			{data.map(header => (
				<th scope="col" key={header.id}>
					{header.title}
				</th>
			))}
		</tr>
	)
}

export default Headers
