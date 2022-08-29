import { lazy } from '@loadable/component'
import React, { ReactElement, Suspense } from 'react'
import { Route, Routes as RouterRoutes } from 'react-router-dom'

const Home = lazy(() => import('./routes/Home'))
const Matches = lazy(() => import('./routes/Matches'))
const SignIn = lazy(() => import('./routes/SignIn'))
const Target = lazy(() => import('./routes/TargetSelect'))

export function Routes(): ReactElement {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterRoutes>
        <Route index element={<Home />} />

        <Route path='/sign-in' element={<SignIn />} />

        <Route path='/matches' element={<Matches />} />

        <Route path='/target' element={<Target />} />
      </RouterRoutes>
    </Suspense>
  )
}
