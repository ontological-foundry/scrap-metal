import { AccountCircle } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(): ReactElement {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <ButtonBase component={Link} to={'/'} disableRipple={true}>
          <Typography variant='h4'>Scrap Metal</Typography>
        </ButtonBase>

        <Box sx={{ flex: 1 }} />

        <Button component={Link} to={'/matches'}>
          Matches
        </Button>

        <IconButton color='inherit' component={Link} to='/sign-in'>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
