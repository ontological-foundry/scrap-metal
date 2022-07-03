import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import Navbar from './components/Navbar'
import { Routes } from './Routes'
import { theme } from './utils/theme'

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Navbar />
        <Routes />
      </Router>
    </ThemeProvider>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
