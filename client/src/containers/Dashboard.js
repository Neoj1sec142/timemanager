import React from 'react'

const Dashboard = () => {
  return (
    <div className='container-fluid'>
      <p className='text-center text-white fs-1 dash-header'>Welcome Back Neo!</p>
      <div className='d-flex justify-content-center'>
        <div className='dash-container'>
          <img src={require('../assets/guy.jpeg')} alt=" "  className='dash-img'/>
        </div>
      </div>
      <p className='text-center text-white fs-5'>“We cannot solve problems with the kind of thinking we employed when we came up with them.”</p>
      <p className='text-center text-white fs-7 mt-1'>“Learn as if you will live forever, live like you will die tomorrow.”</p>
    </div>
  )
}

export default Dashboard