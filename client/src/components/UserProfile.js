import Button from "@material-ui/core/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Card from "./Card";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function UserProfile(props) {
  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const history = useHistory();
  // const [favList, setFavList] = useState([]);

  const fetchUserFavourites = () => {
    const endpoint = window.location.pathname.split("/");
    const id = endpoint[endpoint.length - 1];
    // hardcoded for now ~ was ${id}
    axios.get(`/api/users/${id}/favourites`).then((res) => {
      setState((prev) => res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUserFavourites();
  }, []);

  let favShops = [];

  const filterUserFavouriteShops = () => {
    const favouriteShopIds = state.map((shop) => {
      return shop.shop_id;
    });
    favShops = props.shops.filter((shop) => {
      if (favouriteShopIds.includes(shop.id)) {
        return shop;
      }
    });
  };

  filterUserFavouriteShops();

  const favouriteList = favShops.map((shop) => {
    shop.isFavourited = true;
    // <Card />
    return (
      <Grid item style={{ padding: 30 }} xs={4}>
        <Card key={shop.id} {...shop} user={props.user} />
      </Grid>
    );
  });

  return (
    <div>
      <br />
      <br />
      {isLoading ? (
        <div className="App">
          <CircularProgress />
        </div>
      ) : (
        <Grid item xs={4}></Grid>
      )}
      <Grid container alignItems="center">
        <Grid item xs={2}></Grid>
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
            }}
          >
            + Shop
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        {favouriteList}
      </Grid>
    </div>
  );
}
