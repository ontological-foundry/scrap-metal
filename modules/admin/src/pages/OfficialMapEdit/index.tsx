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
        console.error('Error Getting Map', res.error)
      }
    })
  }, [])

  return (
    <Box
      sx={{
        margin: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TitleBar title={'Map'} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          // width: 1,
          // height: 1,
        }}
      >
        <MapEdit
          map={mapRef.current!}
          updateMap={() => {
            console.log('hi')
          }}
        />
      </Box>
    </Box>
  )
}
