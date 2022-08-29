import React, { ReactElement, useRef, useState } from 'react'
import {
  CircularProgress,
  Container,
  TextField,
  Typography,
  Link,
  Box,
} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { FormBackground } from '../../components/Form/FormBackground'
import { FormAvatar } from '../../components/Form/FormAvatar'
import { FormSubmit } from '../../components/Form/FormSubmit'
import { postRequest, SuccessfulAPIResponse } from '../../utils/API'

interface SignInResponse extends SuccessfulAPIResponse {
  data: {
    // TODO: User Type
    user: any
  }
}

export default function SignIn(): ReactElement {
  // Refs for inputs
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [submitting, setSubmitting] = useState(false)
  const [requestError, setRequestError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    // TODO: Validation

    setSubmitting(true)
    setRequestError(null)

    const response = await postRequest<SignInResponse>('/sign-in', {
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!response.success) {
      // TODO: More specific errors
      console.log('Not Successful')

      setRequestError('Email or Password incorrect')
      setSubmitting(false)
      return
    }

    // Success!
    // TODO: Do something with user

    // TODO: Navigate back to referred location
    navigate('/')
  }

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
      <FormSubmit
        disabled={submitting}
        fullWidth
        variant='outlined'
        onClick={handleSubmit}
      >
        {submitting ? <CircularProgress /> : 'Sign In'}
      </FormSubmit>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          marginTop: 2,
        }}
      >
        <Link variant='body2' component={RouterLink} to='/recover-account'>
          Recover Account
        </Link>

        <Box sx={{ flex: 1 }} />

        <Link variant='body2' component={RouterLink} to='/create-account'>
          Create a new account
        </Link>
      </Box>
    </Container>
  )
}
