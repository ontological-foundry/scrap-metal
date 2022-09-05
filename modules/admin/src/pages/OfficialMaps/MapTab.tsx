import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { ReactElement } from 'react'

import { MapListData } from './index'
import { MapCard } from './MapCard'

interface MapTabProps {
  maps: MapListData[]
}

export function MapTab({ maps }: MapTabProps): ReactElement {
  if (maps.length < 1) {
    return <Box>There are no maps!</Box>
  }

  return (
    <>
      {maps.map(element => (
        <Grid xs={6} md={4} key={element.id}>
          <MapCard name={element.name} id={element.id} />
        </Grid>
      ))}
    </>
  )
}
