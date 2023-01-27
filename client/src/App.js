import './styles/App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './containers/Dashboard'
import FooterBar from './containers/FooterBar'
import Alert from './utils/Alert'
import TsForm from './components/TsForm'
const App = () => {
  return (
    <div>
      <Alert />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add-ts' element={<TsForm />} />
      </Routes>
      <FooterBar />
    </div>
  )
}

export default App