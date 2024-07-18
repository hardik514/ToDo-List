import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-amber-400 text-black py-4'>
        <div className="logo">
            <span className='font-extrabold text-xl mx-9'>Achiever</span>
        </div>
        <ul className="flex gap-6 font-bold mx-11">
            <li className='cursor-pointer hover:font-extrabold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-extrabold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar