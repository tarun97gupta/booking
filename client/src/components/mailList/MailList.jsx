import React from 'react'
import './mailList.css'

function MailList() {
    return (
        <div className='mail'>
            <h1 className="mailTitle">Save Time,Save Money!!!</h1>
            <span className='mailDesc'>Signup and we'll send the best deals to you</span>
            <div className="mailInputContainer">
                <input placeholder='Your email' type='email' />
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default MailList