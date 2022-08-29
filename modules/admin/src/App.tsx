import { CssBaseline } from '@mui/material'
import React, { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Routes from './Routes'

function App(): ReactElement {
  return (
    <>
      <CssBaseline />

      <Router>
        <Navbar />
        <Routes />
      </Router>
    </>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
