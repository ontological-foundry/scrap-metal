import React, { ReactElement } from 'react'
import { Route, Routes as RouterRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Maps from './pages/Maps'

export default function Routes(): ReactElement {
  return (
    <RouterRoutes>
      <Route index element={<Home />} />
      <Route path={'/maps'} element={<Maps />} />
    </RouterRoutes>
  )
}
