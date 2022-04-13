import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const AssetList = ({ thoughts, title }) => {


  return (
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
            Explore Collections
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            View what's hot and decide what collection fits your taste
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
          </Stack>{error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </Container>
      </Box>
      <Container maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {
            assets.length === 0 || isLoading || loading ?
              <h1>Loading...</h1>
              :
              assets.map((asset, i) => (
                <Grid item key={asset.id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        assets[i].image_url === null ?
                          'https://source.unsplash.com/random/?moon,space'
                          :
                          `${assets[i].image_url}`
                      }
                      alt="random"
                      sx={{ maxHeight: '264px' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {
                          assets[i].name ?
                            assets[i].name :
                            `${assets[i].collection.name} #${assets[i].token_id}`
                        }
                      </Typography>
                      <Typography
                        style={{ wordWrap: "break-word" }}
                        sx={{ height: '90%', maxHeight: '250px', overflow: 'auto' }} >
                        {assets[i].collection.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-evenly' }}>
                      <IconButton href={`${assets[i].permalink}`} target="_blank" alt="OpenSea"><img src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.svg" alt="OpenSea" width="35px" /></IconButton>
                      <Button size="small" className={'gray'}><ShoppingCartIcon /></Button>
                      <IconButton
                        size="small"
                        aria-label="like"
                        data-name={
                          assets[i].name ? assets[i].name :
                            `${assets[i].collection.name} #${assets[i].token_id}`
                        }
                        data-image_url={
                          assets[i].image_url === null ?
                            'https://source.unsplash.com/random/?moon,space'
                            :
                            `${assets[i].image_url}`
                        }
                        data-permalink={`${assets[i].permalink}`}
                        data-id={asset.id}
                        className={(oldFavorites.some(e => e.openSeaId == asset.id) || (isActive === i)) ? 'red' : 'gray'}
                        onClick={(event) => handleFavoriteClick(i, event)} >
                        <FavoriteIcon pointerEvents="none" />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>

              ))}
        </Grid>
      </Container>
    </main>
  );
};

export default AssetList;
