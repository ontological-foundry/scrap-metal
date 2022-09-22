import { MapData } from '@scrapmetal/common/types/MapData'
import { debounce } from 'lodash'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
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

    const engine = new Phaser.Game({
      type: Phaser.AUTO,
      scale: {
        parent: ref,
        mode: Phaser.Scale.NONE,
        width: ref.clientWidth,
        height: ref.clientHeight,
      },
    })

    engine.scene.add(LoadSceneKey, LoadScene, true, {
      nextSceneKey: EditMapSceneKey,
    })
    engine.scene.add(EditMapSceneKey, EditMapScene)

    const setSmall = () => {
      engine.scale.resize(0, 0)
      setLarge()
    }
    const setLarge = debounce(() => {
      engine.scale.resize(ref.clientWidth, ref.clientHeight)
    }, 500)

    window.addEventListener('resize', setSmall)

    return () => {
      engine.destroy(true)
      window.removeEventListener('resize', setSmall)
    }
  }, [])

  return (
    <Box sx={{ width: 1, height: 1 }} ref={phaserElementRef}>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          zIndex: -10,
        }}
      >
        Sizing
      </Box>
    </Box>
  )
}
