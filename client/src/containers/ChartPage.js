import React from 'react'
import BarChart from '../components/BarChart'
const ChartPage = () => {
  return (
    <div className='container-fluid'>
      <br />
      <br />
        <div className='d-flex justify-content-center mt-3'>
        <br />
        <br />
            <div className='row w-75 shadow-sm mt-3'>
              <p className='text-center text-white fs-2'>Weekly Graph</p>
              <div className='d-flex justify-content-center'>
                <BarChart width='320px' height='360px' />
              </div>
            </div>
        </div>
    </div>
  )
}

export default ChartPage