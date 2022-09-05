import React, { ReactElement } from 'react'
import { Route, Routes as RouterRoutes } from 'react-router-dom'
import { Home } from './pages/Home'
import { OfficialMapEdit } from './pages/OfficialMapEdit'
import { OfficialMaps } from './pages/OfficialMaps'

export function Routes(): ReactElement {
  return (
    <RouterRoutes>
      <Route index element={<Home />} />
      <Route path={'official-maps'} element={<OfficialMaps />} />
      <Route path={'official-map'}>
        <Route path={':id'} element={<OfficialMapEdit />} />
      </Route>
    </RouterRoutes>
  )
}
