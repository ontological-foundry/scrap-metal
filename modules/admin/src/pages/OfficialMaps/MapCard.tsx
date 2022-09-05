import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from '@mui/material'
import React, { ReactElement } from 'react'

interface MapCardProps {
  name: string
  id: string
}

export function MapCard({ name }: MapCardProps): ReactElement {
  return (
    <Card>
      <CardContent>
        <Typography>Map {name}</Typography>
      </CardContent>
      <CardActions>
        <Button>Edit</Button>
      </CardActions>
    </Card>
  )
}
