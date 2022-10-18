import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Navigation from './Navigation'

const drawerWidth = 240;

const PrivateLayout = ({ children, title }) => {
  const router = useRouter()
  const { data: session, loading } = useSession()

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [session, router])

  if (!session || loading) {
    return <div></div>
  }

  return <Box sx={{ display: 'flex' }}>
    <Navigation drawerWidth={drawerWidth} title={title} />

    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />

      { children }
    </Box>
  </Box>
}

export default PrivateLayout
