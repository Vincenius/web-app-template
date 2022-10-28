import Typography from '@mui/material/Typography'
import PublicLayout from '../components/PublicLayout/PublicLayout'
import Pricing from '../components/Pricing/Pricing'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <PublicLayout
      title="Web App Template"
      description="A Next.js template including authentication and a lot more."
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

          <Typography variant="h5" color="text.secondary" component="p" gutterBottom>
            🔒 Authentication logic using <code>next-auth/react</code>
          </Typography>
          <Typography variant="h5" color="text.secondary" component="p" gutterBottom>
            📈 User creation stored in <code>MongoDB</code>
          </Typography>
          <Typography variant="h5" color="text.secondary" component="p" gutterBottom>
            🎨 A landing page, authentication pages and a logged in view created with <code>MaterialUI</code>
          </Typography>
          <Typography variant="h5" color="text.secondary" component="p">
            ✉️ Reset password logic and email sending with <code>nodemailer</code>
          </Typography>
        </section>
        <section className={styles.section} id="pricing">
          <Pricing />
        </section>
      </main>
    </PublicLayout>
  )
}
