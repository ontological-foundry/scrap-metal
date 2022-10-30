import { Box, CircularProgress, styled } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import {
  GraphicsURL,
  SelectionCursorPadding,
  TileSize,
} from '@scrapmetal/common/engine/GraphicsData/General'
import {
  TileData,
  TileKey,
} from '@scrapmetal/common/engine/GraphicsData/TileData'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import Spritesheet from 'react-responsive-spritesheet'

interface PlacementToolProps {
  tileKey: TileKey
}

export function PlacementTool({ tileKey }: PlacementToolProps): ReactElement {
  const [blobUrl, setBlobUrl] = useState<string>()

  useEffect(() => {
    const url = `${GraphicsURL}${TileData[tileKey].path}`

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const resultUrl = URL.createObjectURL(blob)

        setBlobUrl(resultUrl)
      })
      .catch(error => console.error('Could not fetch image'))
  }, [])

  if (blobUrl == null) {
    return <CircularProgress />
  }

  return (
    <Grid xs={3}>
      <Box sx={{ position: 'relative' }}>
        <ToolBlock
          image={blobUrl}
          widthFrame={TileSize}
          heightFrame={TileSize}
          // TODO: Actual Steps in Spritesheet
          steps={1}
          fps={1}
          direction={'forward'}
        />
      </Box>
    </Grid>
  )
}

const ToolBlock = styled(Spritesheet)({
  padding: `${SelectionCursorPadding}`,
  width: TileSize,
  height: TileSize,
})

const Overlay = styled('img')({
  position: 'absolute',
  top: '0%',
  pointerEvents: 'none',
})
