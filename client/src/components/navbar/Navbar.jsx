import React, { useContext } from 'react'
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

function Navbar() {

  //Context API used to get data of user using useContext hook.

  const { user } = useContext(AuthContext)


  return (
    <div className='navbar'>
      <div className='navContainer'>

//Link is used to create a clickable button, where we can redirect to other page. Especially for Home icon.

        <Link to='/' style={{color:'inherit',textDecoration:'none'}}>
          <span className='logo'>Tarun Booking</span>
        </Link>
        {user ? user.username :(<div className='navItems'>
          <button className="navButton">Sign-Up</button>
          <button className="navButton">Login</button>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar