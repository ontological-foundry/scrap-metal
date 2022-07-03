import { styled, Card } from '@mui/material'

export const FormBackground = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))
