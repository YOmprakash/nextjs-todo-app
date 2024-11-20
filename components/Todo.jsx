import { mongo } from 'mongoose'
import React from 'react'

const Todo = ({mongoId,updateTodo,deleteTodo,id,title,description,completed}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
     {id}
    </th>
    <td className="px-6 py-4">
      {title}
    </td>
    <td className="px-6 py-4">
      {description}
    </td>
    <td className="px-6 py-4">
      {completed ? 'completed' :'pending'}
    </td>
    <td className="px-6 py-4">
      <button onClick={() => deleteTodo(mongoId)} className='bg-red-500 text-white'>delete</button>
      {completed ? '' :<button onClick={() => updateTodo(mongoId)} className='bg-green-500 text-white'>delete</button>}
    </td>
  </tr>
  )
}

export default Todo