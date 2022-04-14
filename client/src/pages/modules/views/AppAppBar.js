import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Auth from '../../../utils/auth';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const leftLink = {
  fontSize: 16,
  color: 'common.white',
  mr: 3,
};

function AppAppBar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }} >
          <Link
              color="inherit"
              variant="h6"
              underline="none"
              sx={leftLink} >
            {Auth.loggedIn() ? (
              <span>Welcome, {Auth.getUser().data.username}!</span>
            ) : (
              <></>
            )}
            </Link>
            {Auth.loggedIn() ? (
              <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/favorites/"
              sx={leftLink} >
              {'My Favorites'}
            </Link>
            ) : (
              <></>
            )}
          </Box>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }} >
            {'MoonBay '}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/explore/"
              sx={rightLink} >
              {'Explore'}
            </Link>
            {Auth.loggedIn() ? (
              <>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  href="/signin/"
                  sx={rightLink}
                  onClick={logout}>
                  {'Logout'}
                </Link>
              </>
            ) : (
              <>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  href="/login/"
                  sx={rightLink}
                >
                  {'Login'}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  href="/signup/"
                  sx={{ ...rightLink, color: 'secondary.main' }}
                >
                  {'Sign Up'}
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
