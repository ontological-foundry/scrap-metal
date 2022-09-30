import { MapData } from '@scrapmetal/common/types/MapData'
import { debounce } from 'lodash'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Phaser from 'phaser'
import {
  EditMapScene,
  EditMapSceneKey,
} from '../engine/Scenes/EditScene/EditMapScene'
import { LoadScene, LoadSceneKey } from '../engine/Scenes/LoadScene'
import { Tools } from './Tools'

interface MapEditProps {
  map: MapData
  updateMap: (data: MapData) => void
}

export function MapEdit({ map, updateMap }: MapEditProps): ReactElement {
  const phaserElementRef = useRef<HTMLDivElement>(null)

  const [isSizing, setIsSizing] = useState(false)

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
    engine.scene.add(EditMapSceneKey, EditMapScene, false, {
      map,
      updateMap,
    })

    const setLarge = debounce(() => {
      engine.scale.resize(ref.clientWidth, ref.clientHeight)
      setIsSizing(false)
    }, 500)

    const setSmall = () => {
      engine.scale.resize(0, 0)
      setIsSizing(true)
      setLarge()
    }

    window.addEventListener('resize', setSmall)

    return () => {
      engine.destroy(true)
      window.removeEventListener('resize', setSmall)
    }
  }, [])

  return (
    <>
      <Box
        sx={{
          width: 1,
          height: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ref={phaserElementRef}
      >
        {isSizing && <Typography>Sizing</Typography>}
      </Box>
      <Box sx={{ width: 300, margin: theme => theme.spacing(0, 2) }}>
        <Tools />
      </Box>
    </>
  )
}
