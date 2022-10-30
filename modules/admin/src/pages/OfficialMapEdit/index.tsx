import { Box, CircularProgress } from '@mui/material'
import {
  getRequest,
  SuccessfulAPIResponse,
} from '@scrapmetal/common/client/API'
import { MapData } from '@scrapmetal/common/types/MapData'
import { MapEdit } from '@scrapmetal/map-editor/src'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TitleBar from '../../components/TitleBar'

interface GetMapResponse extends SuccessfulAPIResponse {
  data: MapData
}

export function OfficialMapEdit(): ReactElement {
  const { id } = useParams<{ id: string }>()

  const [mapData, setMapData] = useState<MapData>()

  useEffect(() => {
    getRequest<GetMapResponse>(`/official-map/${id}`).then(res => {
      if (res.success) {
        setMapData(res.data)
      } else {
        console.error('Error Getting Map', res.error)
      }
    })
  }, [])

  const updateMap = useCallback((newMap: Partial<MapData>) => {
    // TODO
    console.log('New Partial Map Data', newMap)
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
        }}
      >
        {mapData == null ? (
          <CircularProgress />
        ) : (
          <MapEdit map={mapData} updateMap={updateMap} />
        )}
      </Box>
    </Box>
  )
}
