import { Box, Typography } from '@mui/material'
import React, { ReactElement } from 'react'

export default function Home(): ReactElement {
  return (
    <Box sx={{ margin: '1rem' }}>
      <Typography variant='body1'>
        This site is not constructed with Mobile in mind, in fact it will
        probably not be possible to play without a mouse. Proceed at your
        discretion.
      </Typography>
    </Box>
  )
}
