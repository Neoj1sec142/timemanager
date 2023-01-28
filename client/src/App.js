import './styles/App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './containers/Dashboard'
import FooterBar from './containers/FooterBar'
import Alert from './utils/Alert'
import TsForm from './components/TsForm'
import ChartPage from './containers/ChartPage'
import WeekBoard from './containers/WeekBoard'

const App = () => {
  return (
    <div className='app w-100 h-100 cb'>
      <Alert />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add-ts' element={<TsForm />} />
        <Route path='/week' element={<WeekBoard />} />
        <Route path='/chart' element={<ChartPage />} />
      </Routes>
      <FooterBar />
    </div>
  )
}

export default App