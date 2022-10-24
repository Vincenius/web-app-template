import React from 'react'
import NextLink from 'next/link'
import MuiLink from '@mui/material/Link'

const Link = ({ children, href }) => {
    return <NextLink href={href} passHref>
      <MuiLink>{children}</MuiLink>
  </NextLink>
}

export default Link
