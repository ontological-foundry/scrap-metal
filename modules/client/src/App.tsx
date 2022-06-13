import React, { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import loadable from '@loadable/component'

const Home = loadable(() => import('./Home'), {
  resolveComponent: component => component.Home,
  fallback: <h1>Loading Home</h1>,
})
const Matches = loadable(() => import('./Matches'), {
  resolveComponent: component => component.Matches,
  fallback: <h1>Loading Matches</h1>,
})

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/matches' element={<Matches />} />
      </Routes>
    </Router>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
