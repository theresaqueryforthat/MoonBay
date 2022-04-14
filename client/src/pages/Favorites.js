import * as React from 'react';
import AppAppBar from './modules/views/AppAppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import withRoot from './modules/withRoot';
import AppFooter from './modules/views/AppFooter';
import Copyright from './modules/components/Copyright';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Favorites() {
  return (
    <React.Fragment>
      <AppAppBar />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Favorite Collections
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              The home for all of your favorite collections!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            </Stack>
          </Container>
        </Box>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Favorite Name
                    </Typography>
                    <Typography>
                      Favorite description goes here, or other info...
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-evenly' }}>
                    <Button size="small">View</Button>
                    <Button size="small">Purchased?</Button>
                    <Fab size="small" aria-label="like">
                      <FavoriteIcon />
                    </Fab>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <AppFooter />
      <Copyright />
    </React.Fragment>
  );
}

export default withRoot(Favorites);
