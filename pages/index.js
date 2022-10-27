import Typography from '@mui/material/Typography'
import PublicLayout from '../components/PublicLayout/PublicLayout'
import Pricing from '../components/Pricing/Pricing'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <PublicLayout
      title="Modest App | Micro-blogging platform to quickly create a twitter-like blog"
      description="This is a micro-blogging template to quickly create a twitter-like blog. You can write in markdown and upload images and videos."
      noAppNameInTitle={true}
      transparentNav={true}
    >
      <header className={styles.header}>
        <div className={styles.background}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className={styles.headerContent}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Web App
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="h2">
            A cool template to quickly get started creating web apps.
          </Typography>
        </div>
      </header>

      <main>
        <section className={styles.section} id="features">
          <Typography
            component="h2"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Features
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            List your cool features here!
          </Typography>
        </section>
        <section className={styles.section} id="pricing">
          <Pricing />
        </section>
      </main>
    </PublicLayout>
  )
}
