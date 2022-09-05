import { Box } from '@mui/material'
import {
  getRequest,
  SuccessfulAPIResponse,
} from '@scrapmetal/common/client/API'
import { MapData } from '@scrapmetal/common/types/MapData'
import { MapEdit } from '@scrapmetal/map-editor/src'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import TitleBar from '../../components/TitleBar'

interface GetMapResponse extends SuccessfulAPIResponse {
  data: MapData
}

export function OfficialMapEdit(): ReactElement {
  const { id } = useParams<{ id: string }>()

  const mapRef = useRef<MapData>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRequest<GetMapResponse>(`/official-map/${id}`).then(res => {
      if (res.success) {
        mapRef.current = res.data
        setLoading(false)
      } else {
        console.error('Error Getting Map')
      }
    })
  }, [])

  return (
    <Box
      sx={{
        margin: 2,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TitleBar title={'Map'} />
      <Box
        sx={{
          height: 1,
          width: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <Box>Loading</Box>
        ) : (
          <MapEdit
            map={mapRef.current!}
            updateMap={() => {
              console.log('hi')
            }}
          />
        )}
      </Box>
    </Box>
  )
}
