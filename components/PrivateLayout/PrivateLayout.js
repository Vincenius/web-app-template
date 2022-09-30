import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const PrivateLayout = ({ children }) => {
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

  return <div>
    { children }
  </div>
}

export default PrivateLayout
