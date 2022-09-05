import { Box, Button, Container, Tab, Tabs } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import {
  getRequest,
  SuccessfulAPIResponse,
} from '@scrapmetal/common/client/API'
import React, { ReactElement, useEffect, useState } from 'react'
import TitleBar from '../../components/TitleBar'
import CreateMapDialog from './CreateMapDialog'
import { MapTab } from './MapTab'

export interface MapListData {
  name: string
  id: string
}

interface MapsResponse extends SuccessfulAPIResponse {
  data: {
    published: MapListData[]
    unpublished: MapListData[]
  }
}

export function OfficialMaps(): ReactElement {
  const [tab, setTab] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [loading, setLoading] = useState(true)
  const [unpublishedMaps, setUnpublishedMaps] = useState<MapListData[]>()
  const [publishedMaps, setPublishedMaps] = useState<MapListData[]>()

  useEffect(() => {
    getRequest<MapsResponse>('/official-maps').then(async res => {
      if (res.success) {
        console.log('Maps', res.data)

        setUnpublishedMaps(res.data.unpublished)
        setPublishedMaps(res.data.published)
        setLoading(false)
      } else {
        console.error('Cannot Get Maps')
      }
    })
  }, [])

  if (loading) {
    return <Box>Loading</Box>
  }

  const currentMaps = tab === 0 ? unpublishedMaps : publishedMaps

  return (
    <>
      <Container maxWidth='md' sx={{ marginTop: 2 }}>
        <TitleBar
          title={'Official Maps'}
          endElement={
            <Button variant='outlined' onClick={() => setDialogOpen(true)}>
              Create Map
            </Button>
          }
        />
        <Box sx={{ marginTop: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={(_, newValue) => {
              setTab(newValue)
            }}
          >
            <Tab label='Unpublished' />
            <Tab label='Published' />
          </Tabs>
        </Box>
        <Grid sx={{ margin: 2 }} container spacing={2}>
          <MapTab maps={currentMaps!} />
        </Grid>
      </Container>
      <CreateMapDialog open={dialogOpen} setOpen={setDialogOpen} />
    </>
  )
}
