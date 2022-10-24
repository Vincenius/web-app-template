import React, { useState, useEffect } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!!session) {
      router.push('/app/dashboard')
    }
  }, [session, router])

  const login = async e => {
    e.preventDefault()
    setIsLoading(true)

    const response = await signIn('credentials', { redirect: false, username, password })

    setIsLoading(false)

    if (!response ||  response.status !== 200) {
      setError(true)
    }
  }

  if (loading) {
    return <div></div>
  }

  return <PublicLayout
    title="Login"
    description="Log in into your micro-blog"
  >
    <Card sx={{ width: 300, margin: '0 auto' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1" style={{ textAlign: 'center'}}>
          Login
        </Typography>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: '10px 0', width: '100%' },
          }}
          onSubmit={login}
        >
          <TextField
            required
            error={isError}
            label="E-Mail"
            variant="outlined"
            value={username}
            onChange={e => {
              setError(false)
              setUsername(e.target.value)
            }}
          />
          <TextField
            required
            error={isError}
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={e => {
              setError(false)
              setPassword(e.target.value)
            }}
          />

          {isError && <Typography gutterBottom color="error.main" style={{ fontSize: '0.8em' }}>
            Login failed: wrong credentials.
          </Typography>}

          <Button
            variant="contained"
            type="submit"
            style={{ margin: '10px 0 20px', width: '100%' }}
            disabled={isLoading}
          >
            Log In
          </Button>

          <Link href="forgot-password">
            <Typography gutterBottom style={{ fontSize: '1em' }}>
              Forgot Password
            </Typography>
          </Link>
          <Link href="sign-up">
            <Typography gutterBottom style={{ fontSize: '1em' }}>
              Create account
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  </PublicLayout>
}

export default Login


