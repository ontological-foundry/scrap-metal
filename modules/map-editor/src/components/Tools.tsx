import { Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { TileKey } from '@scrapmetal/common/engine/GraphicsData/TileData'
import React, { ReactElement } from 'react'
import { PlacementTool } from './PlacementTool'

export function Tools(): ReactElement {
  return (
    <>
      <Typography variant='h4'>Tools</Typography>
      <Typography variant='body2'>Terrain</Typography>
      <Grid container>
        <PlacementTool tileKey={TileKey.Forest} />
      </Grid>
    </>
  )
}
