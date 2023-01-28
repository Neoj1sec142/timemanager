import React from 'react'

const FooterBar = () => {
  return (
    <div className='fixed-bottom w-100 footer-container'>
        <nav className='d-flex justify-content-evenly mt-1'>
            <a className="ft-link" href='/'>Home</a>
            <a className="ft-link" href='/add-ts'>Add TS</a>
            <a className="ft-link" href='/week'>Check Week</a>
            <a className="ft-link" href='/chart'>Check Graph</a>
        </nav>
    </div>
  )
}

export default FooterBar