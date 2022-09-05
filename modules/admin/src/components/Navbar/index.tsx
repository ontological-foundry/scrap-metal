import React, { ReactElement } from 'react'
import {
  AppBar,
  Toolbar,
  ButtonBase,
  Typography,
  Button,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'

export function Navbar(): ReactElement {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <ButtonBase component={Link} to={'/'} disableRipple={true}>
          <Typography variant='h4'>Scrap Metal Admin</Typography>
        </ButtonBase>

        <Box sx={{ flex: 1 }} />

        <Button color={'inherit'} component={Link} to={'/official-maps'}>
          Maps
        </Button>
      </Toolbar>
    </AppBar>
  )
}
