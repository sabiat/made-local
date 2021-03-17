import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function UserProfile() {

  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState({
    favourites: []
  });
  const history = useHistory();

  const fetchUserFavourites = () => {
    const endpoint = window.location.pathname.split('/')
    const id = endpoint[endpoint.length - 1]
    axios.get(`/api/users/${id}`)
      .then(res => {
        setState(prev => ({ ...prev, favourites: res.data }));
        setLoading(false);
      })
  }
  useEffect(() => {
    fetchUserFavourites();
  }, []);

  return (
    <div>
      <br/><br/>
      <Grid container alignItems="center">
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
        <Typography variant="body1">
        <FavoriteIcon />
      </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/shops/new");
            }}>
            + Shop
        </Button>
        </Grid>
      </Grid>
      

      {isLoading ?
        <div className="App">Loading...</div> :
        <Grid item xs={4}>
        </Grid>
      }
    </div>
  );
}