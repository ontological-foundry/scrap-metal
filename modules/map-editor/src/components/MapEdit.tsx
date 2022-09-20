import { MapData } from '@scrapmetal/common/types/MapData'
import React, { ReactElement, useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import Phaser from 'phaser'
import { EditMapScene, EditMapSceneKey } from '../engine/EditMapScene'
import { LoadScene, LoadSceneKey } from '../engine/LoadScene'

interface MapEditProps {
  map: MapData
  updateMap: (data: MapData) => void
}

export function MapEdit({ map, updateMap }: MapEditProps): ReactElement {
  const phaserElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ref = phaserElementRef.current!

    const createEngine = (width: number, height: number) => {
      const engine = new Phaser.Game({
        type: Phaser.AUTO,
        scale: {
          parent: ref,
          mode: Phaser.Scale.NONE,
          width,
          height,
        },
      })

      engine.scene.add(LoadSceneKey, LoadScene, true, {
        nextSceneKey: EditMapSceneKey,
      })
      engine.scene.add(EditMapSceneKey, EditMapScene)

      return engine
    }

    let engine: Phaser.Game
    requestAnimationFrame(() => {
      engine = createEngine(ref.clientWidth, ref.clientHeight)
    })
  }, [])

  return <Box sx={{ width: 1, height: 1 }} ref={phaserElementRef} />
}
