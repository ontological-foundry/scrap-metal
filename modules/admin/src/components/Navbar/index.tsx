import React, { ReactElement } from 'react'
import { AppBar, Toolbar, ButtonBase, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Navbar(): ReactElement {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <ButtonBase component={Link} to={'/'} disableRipple={true}>
          <Typography variant='h4'>Scrap Metal Admin</Typography>
        </ButtonBase>
      </Toolbar>
    </AppBar>
  )
}
