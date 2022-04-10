import * as React from 'react';
import { useState, useEffect } from 'react';
import AppAppBar from './AppAppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import withRoot from '../withRoot';
import Link from '@mui/material/Link';
import axios from 'axios';

const cards = [1, 2, 3];

function TopCollection() {
    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        (async () => {
            let config = {
                headers: {
                    Accept: 'application/json',
                    'X-API-KEY': process.env.REACT_APP_API_KEY
                }
            }
            setIsLoading(true);
            const{
                data
            } = await axios.get('https://api.opensea.io/api/v1/assets?order_direction=desc&limit=3&include_orders=false', config);
            setAssets(data.assets);
            setIsLoading(false);
        })();
        return () => {
            console.log('Unloading initial call...');
        }
    }, []);

    console.log(assets);
    
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
              Recent Mints
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Here's some of the latest NFTs:
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
            {
              assets.length === 0 ?
              <h1>Loading...</h1>
              :
            assets.map((asset, i) => (
              <Grid item key={asset.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image={`${assets[i].image_url}`}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {
                      assets[i].name ?
                      assets[i].name :
                      `${assets[i].collection.name} #${assets[i].token_id}`
                      }
                    </Typography>
                    <Typography>
                      {assets[i].collection.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-evenly' }}>
                  <Button size="large" href={`${assets[i].permalink}`} target="_blank">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
            </main>
        </React.Fragment>
    );
}

export default withRoot(TopCollection);