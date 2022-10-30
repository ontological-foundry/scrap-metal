import { Box } from '@mui/material'
import { GraphicsURL } from '@scrapmetal/common/engine/GraphicsData/General'
import {
  TileData,
  TileKey,
} from '@scrapmetal/common/engine/GraphicsData/TileData'
import React, { ReactElement, useMemo } from 'react'

interface ToolSpriteProps {
  tileKey: TileKey
}

export default function ToolSprite({ tileKey }: ToolSpriteProps): ReactElement {
  const imagePath = useMemo(() => `${GraphicsURL}${TileData[tileKey].path}`, [])

  return (
    <Box
      sx={{
        backgroundImage: `url("${imagePath}")`,
      }}
    />
  )
}
