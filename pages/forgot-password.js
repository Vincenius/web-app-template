import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PublicLayout from '../components/PublicLayout/PublicLayout'

const Forgot = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const submit = e => {
    setIsLoading(true)
    e.preventDefault()
    const options = {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
          'Content-Type': 'application/json'
      }
    }
    fetch('/api/auth/forgot-password', options)
      .then(async res => {
        if (res.status !== 200) {
          setIsError(true)
        } else {
          setIsSuccess(true)
        }
        setIsLoading(false)
      })
      .catch(e => setError('Unexpected Error'))
  }

  return <PublicLayout
    title="Forgot Password"
    description="Reset the password for your account."
  >
    <Card sx={{ width: 300, margin: '0 auto' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1" style={{ padding: '4px' }}>
          Reset your password
        </Typography>

        <Typography gutterBottom style={{ padding: '4px', color: '#616161', fontSize: '0.9em' }}>
          Tell us the email address associated with your account, and we’ll send you an email with a link to reset your password.
        </Typography>

        {isSuccess && <Typography gutterBottom color="success.main" style={{ fontSize: '0.8em' }}>
          The reset email was successfully sent.
        </Typography>}

        { !isSuccess &&
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: '10px 0', width: '100%' },
            }}
            onSubmit={submit}
          >
            <TextField
              required
              label="E-Mail"
              variant="outlined"
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
            />

            {isError && <Typography gutterBottom color="error.main" style={{ fontSize: '0.8em' }}>
                Something went wrong. Please try again.
            </Typography>}

            <Button
              variant="contained"
              type="submit"
              style={{ margin: '10px 0 0', width: '100%' }}
              disabled={isLoading}
            >Submit</Button>
          </Box>
        }
      </CardContent>
    </Card>
  </PublicLayout>
}

export default Forgot
