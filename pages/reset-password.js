import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PublicLayout from '../components/PublicLayout/PublicLayout'

const Reset = () => {
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const submit = e => {
    e.preventDefault()
    if (newPassword !== newPasswordRepeat) {
      setError('not_equal')
    } else {
      setIsLoading(true)
      const token = router.query && router.query.token
      const options = {
        method: 'POST',
        body: JSON.stringify({
          password: newPassword,
          token,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      }
      fetch('/api/auth/new-password', options)
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
          Choose a new password.
        </Typography>

        {isSuccess && <Typography gutterBottom color="success.main" style={{ fontSize: '0.8em' }}>
          The password was successfully updated. TODO login link
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
              label="Password"
              variant="outlined"
              type="password"
              error={!!error}
              value={newPassword}
              onChange={e => {
                setError('')
                setNewPassword(e.target.value)
              }}
            />

            <TextField
              required
              label="Repeat password"
              variant="outlined"
              type="password"
              error={!!error}
              value={newPasswordRepeat}
              onChange={e => {
                setError('')
                setNewPasswordRepeat(e.target.value)
              }}
            />

            { error === 'not_equal' && <Typography gutterBottom color="error.main" style={{ fontSize: '0.8em' }}>
              The passwords do not match.
            </Typography> }
            { error === 'expired' && <Typography gutterBottom color="error.main" style={{ fontSize: '0.8em' }}>
              The reset token has expired. Please generate a new reset token.
            </Typography> }
            { error && error !== 'expired' && error !== 'not_equal' && <Typography gutterBottom color="error.main" style={{ fontSize: '0.8em' }}>
              Something went wrong. Please try again.
            </Typography> }

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

export default Reset
