import { Avatar, styled } from '@mui/material'

export const FormAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  marginBottom: theme.spacing(1),
}))
