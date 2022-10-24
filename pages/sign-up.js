import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PublicLayout from '../components/PublicLayout/PublicLayout'
import Link from '../components/Link/Link'

const Login = () => {
  const router = useRouter()
  const { data: session, loading } = useSession()
  const [isLoading, setIsLoading] = useState(false) // TODO loading screen
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  useEffect(() => {
    if (!!session) {
      router.push('/app/dashboard')
    }
  }, [session, router])

  const signUp = e => {
    e.preventDefault()
    if (password !== passwordRepeat) {
      setError('The passwords do not match.')
    } else {
      const options = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
      }
      fetch('/api/auth/sign-up', options)
        .then(async res => {
          if (res.status === 409) {
            console.log('ERR', res)
            setError('A user with this E-Mail already exists.')
          } else {
            const result = await res.json()
            const response = await signIn('credentials', { redirect: false, username: email, password })
          }
        })
        .catch(e => setError('Unexpected Error'))
    }
  }

  if (loading) {
    return <div></div>
  }

  return <PublicLayout
    title="Sign Up"
    description="Create a new account for your own micro-blogging website."
  >
    <Card sx={{ width: 300, margin: '0 auto' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1" style={{ textAlign: 'center' }}>
          Sign-up
        </Typography>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: '10px 0', width: '100%' },
          }}
          onSubmit={signUp}
        >
          <TextField
            required
            error={!!error}
            label="E-Mail"
            variant="outlined"
            value={email}
            size="small"
            type="email"
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <TextField
            required
            error={!!error}
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            size="small"
            onChange={e => {
              setError('')
              setPassword(e.target.value)
            }}
          />
          <TextField
            required
            error={!!error}
            label="Repeat password"
            variant="outlined"
            type="password"
            value={passwordRepeat}
            size="small"
            onChange={e => {
              setError('')
              setPasswordRepeat(e.target.value)
            }}
          />

          {!!error && <Typography gutterBottom color="error.main" style={{ fontSize: '0.8em' }}>
            {error}
          </Typography>}

          <Button variant="contained" type="submit" style={{ margin: '10px 0 20px', width: '100%' }}>Sign-up</Button>

          <Link href="/login">
            <Typography gutterBottom style={{ fontSize: '1em' }}>
              Already have an account?
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  </PublicLayout>
}

export default Login
