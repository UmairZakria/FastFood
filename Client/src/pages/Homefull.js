import React from 'react'
import { Link } from 'react-router-dom'

const Homefull = () => {
  return (
    <div>
        <Link to="/">Home</Link><br /><Link to='/login'> Login</Link><br /><Link to="signup">Rigister</Link>
      
    </div>
  )
}

export default Homefull
