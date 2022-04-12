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

function AppAppBar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} >
          <Link
              color="inherit"
              variant="h6"
              underline="none"
              sx={rightLink} >
            {Auth.loggedIn() ? (
              <span>Welcome, {Auth.getUser().data.username}!</span>
            ) : (
              <></>
            )}
            </Link>
          </Box>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }} >
            {'MoonBay'}
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
