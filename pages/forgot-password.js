import React, { useState } from 'react'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PublicLayout from '../components/PublicLayout/PublicLayout'

const Forgot = () => {
  const [email, setEmail] = useState('')

  const submit = e => {
    e.preventDefault()
    const options = {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
          'Content-Type': 'application/json'
      }
    }
    fetch('/api/auth/reset-password', options)
      .then(async res => {
        if (res.status !== 200) {
          // TODO display success??
        } else {
          // TODO display success??
          // const result = await res.json()
        }
      })
      .catch(e => setError('Unexpected Error'))
  }

  return <PublicLayout
    title="Forgot Password | Modest"
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
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <Button variant="contained" type="submit" style={{ margin: '10px 0 0', width: '100%' }}>Submit</Button>
        </Box>
      </CardContent>
    </Card>
  </PublicLayout>
}

export default Forgot
