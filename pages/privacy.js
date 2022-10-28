import Typography from '@mui/material/Typography'
import PublicLayout from '../components/PublicLayout/PublicLayout'

export default function Home() {
  return (
    <PublicLayout
      title="Web App | Privacy Policy"
      noAppNameInTitle={true}
      transparentNav={true}
    >

      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Privacy Policy
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="h2">
        Add your privacy policy here!
      </Typography>
    </PublicLayout>
  )
}
