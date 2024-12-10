import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='flex justify-center py-1 gap-2 items-center h-[40px] bg-slate-600 text-gray-300 w-full'>
      <Link to='/admin' className='px-3 font-bold hover:opacity-70 pb-1 rounded-full  bg-slate-400 '>c</Link>
      <h1>Umair Zakria</h1>
      <small>2024 X</small>
    </div>
  )
}

export default Footer
