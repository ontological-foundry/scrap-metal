import { MapData } from '@scrapmetal/common/types/MapData'
import React, { ReactElement, useEffect, useRef } from 'react'
import { Application } from 'pixi.js'
import { Box } from '@mui/material'

interface MapEditProps {
  map: MapData
  updateMap: (data: MapData) => void
}

export function MapEdit({ map, updateMap }: MapEditProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const app = new Application({
      resizeTo: ref.current!,
      backgroundColor: 0x000000,
    })

    ref.current!.appendChild(app.view)
  }, [])

  return <Box sx={{ width: 1, height: 1 }} ref={ref} />
}
