import React from 'react'

const FooterBar = () => {
  return (
    <div className='fixed-bottom w-100 footer-container'>
        <nav className='d-flex justify-content-evenly mt-1'>
            <a href='/'>Home</a>
            <a href='/add-ts'>Add TS</a>
            <a href='/'>Check Week</a>
            <a href='/'>Check Graph</a>
        </nav>
    </div>
  )
}

export default FooterBar