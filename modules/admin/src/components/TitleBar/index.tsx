import { Box, Typography } from '@mui/material'
import React, { ReactElement } from 'react'

interface TitleBarProps {
  title: string
  endElement?: ReactElement | null
}

export default function TitleBar({
  title,
  endElement = null,
}: TitleBarProps): ReactElement {
  return (
    <Box sx={{ display: 'flex', width: 1 }}>
      <Typography variant='h4'>{title}</Typography>

      <Box sx={{ flex: 1 }} />

      {endElement}
    </Box>
  )
}
