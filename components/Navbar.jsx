import React from 'react'

const Navbar = () => {
  return (
    <div className='flex py-3 w-full justify-between px-4'>
        <h1>Todo App</h1>
        <ul className='flex gap-4'>
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </div>
  )
}

export default Navbar