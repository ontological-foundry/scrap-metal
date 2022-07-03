import React, { ReactElement, useRef } from 'react'
import { Container, TextField, Typography } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'

import { FormBackground } from '../../components/Form/FormBackground'
import { FormAvatar } from '../../components/Form/FormAvatar'

export default function SignIn(): ReactElement {
  // Refs for inputs
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <Container maxWidth='sm'>
      <FormBackground>
        <FormAvatar>
          <LockOutlined />
        </FormAvatar>

        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>

        <TextField
          fullWidth={true}
          margin='normal'
          label='Email Address'
          type='email'
          name='email'
          id='email'
          inputRef={emailRef}
        />
        <TextField
          fullWidth={true}
          margin='normal'
          id='password1'
          name='password1'
          label='Password'
          inputRef={passwordRef}
        />
      </FormBackground>
    </Container>
  )
}
