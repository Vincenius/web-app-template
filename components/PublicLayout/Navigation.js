// https://mui.com/material-ui/react-app-bar/

import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import LineStyleIcon from '@mui/icons-material/LineStyle'
import Divider from '@mui/material/Divider'
import { APP_NAME } from '../../utils/constants'

const pages = [
  { title: 'Home', link: '/' },
  { title: 'Features', link: '/#features' },
  { title: 'Pricing', link: '/#pricing' },
]
const settings = [
  { title: 'Dashboard', link: '/app/dashboard' },
  { title: 'Settings', link: '/app/settings' },
]
const signIn = [
  { title: 'Sign-up', link: '/sign-up' },
  { title: 'Login', link: '/login' },
]

const ResponsiveAppBar = ({ transparentNav }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      color={transparentNav ? 'transparent' : 'primary'}
      style={transparentNav ? { boxShadow: 'none' } : {}}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LineStyleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            { APP_NAME }
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link href={page.link} key={page.title}>
                  <MenuItem selected={page.link === router.asPath}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <Divider />
              {signIn.map((item) => (
                <Link href={item.link} key={item.title}>
                  <MenuItem selected={item.link === router.asPath}>
                    <Typography textAlign="center">{item.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <LineStyleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            { APP_NAME }
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href={page.link} key={page.title}>
                <MenuItem selected={page.link === router.asPath}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>

          { !!session && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link href={setting.link} key={setting.title}>
                  <MenuItem selected={setting.link === router.asPath}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <MenuItem onClick={signOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box> }

          { !session && <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              {signIn.map((item) => (
                <Link href={item.link} key={item.title}>
                  <MenuItem>
                    <Typography textAlign="center">{item.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Box> }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
