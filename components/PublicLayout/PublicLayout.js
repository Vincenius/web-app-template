import React from 'react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import { Paper } from '@mui/material'
import Navigation from './Navigation'
import style from './PublicLayout.module.css'
import { APP_NAME } from '../../utils/constants'

const PublicLayout = ({ children, title, description, noAppNameInTitle }) => {
  const pageTitle = `${title}${noAppNameInTitle ? '' : ` | ${APP_NAME}`}`

  return <div>
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      {/* TODO head meta info and font*/}
    </Head>

    <Navigation />

    <Container maxWidth="lg" component="main" className={style.container}>
      {children}
    </Container>

    <Paper component="footer" sx={{ backgroundColor: 'primary.main' }} className={style.footer}>
      <Container maxWidth="lg">
        footer
      </Container>
    </Paper>
  </div>
}

export default PublicLayout
