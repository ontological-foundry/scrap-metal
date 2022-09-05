import { Box, Button, DialogTitle, TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import {
  postRequest,
  SuccessfulAPIResponse,
} from '@scrapmetal/common/client/API'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CreateMapResponse extends SuccessfulAPIResponse {
  data: {
    id: string
  }
}

interface CreateMapProps {
  open: boolean
  setOpen: (newState: boolean) => void
}

export default function CreateMapDialog({
  open,
  setOpen,
}: CreateMapProps): ReactElement {
  const navigate = useNavigate()

  const [mapName, setMapName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const createMap = async () => {
    if (mapName.length < 3) {
      setError('Not Long Enough')
      return
    }

    setSubmitting(true)

    const response = await postRequest<CreateMapResponse>(
      '/create-official-map',
      {
        body: JSON.stringify({
          name: mapName,
        }),
      }
    )

    if (!response.success) {
      console.error('Could not create map', response.error)
      setError('Could not create map')
      setSubmitting(false)
      return
    }

    navigate(`/official-map/${response.data.id}`)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setMapName(event.target.value)
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Map</DialogTitle>
      <Box sx={{ margin: 2 }}>
        <TextField
          label='Map Name'
          value={mapName}
          onChange={handleChange}
          error={error !== null}
          helperText={error}
        />

        <Box sx={{ height: theme => theme.spacing(2) }} />

        <Box sx={{ display: 'flex' }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Box sx={{ flex: 1 }} />

          <Button
            variant='outlined'
            color='secondary'
            disabled={submitting}
            onClick={createMap}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
