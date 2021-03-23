import axios from "axios";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core/";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  font: {
    color: "#84a59D",
    fontWeight: "bold",
    fontSize: "27px",
  },
}));

export default function UserProfile(props) {
  const classes = useStyles();

  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [userShops, setUserShops] = useState([]);
  const history = useHistory();

  const endpoint = window.location.pathname.split("/");
  const id = endpoint[endpoint.length - 1];
  const fetchUserFavourites = () => {
    axios.get(`/api/users/${id}/favourites`).then((res) => {
      setState((prev) => res.data);
      setLoading(false);
    });
  };

  const fetchUserShops = () => {
    return axios.get(`/api/users/${id}/shops`).then((res) => {
      setUserShops((prev) => res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUserFavourites();
    fetchUserShops();
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
    return (
      <Grid item style={{ padding: 30 }} xs={4}>
        <Card key={shop.id} {...shop} user={props.user} />
      </Grid>
    );
  });

  let userOwnShops = [];
  const filterUserOwnShops = () => {
    const userShopIds = userShops.map((shop) => {
      return shop.id;
    });
    userOwnShops = props.shops.filter((shop) => {
      if (userShopIds.includes(shop.id)) {
        return shop;
      }
    });
  };
  console.log(filterUserOwnShops());

  const userShopList = userOwnShops.map((shop) => {
    return (
      <Grid item style={{ padding: 30 }} xs={4}>
        <Card key={shop.id} {...shop} user={props.user} />
      </Grid>
    );
  });

  return (
    <div style={{ padding: "10px 70px 30px 67px" }}>
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
            <FavoriteIcon color="secondary" />
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography className={classes.font}>My favourites</Typography>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          {favouriteList}
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            <StorefrontIcon color="secondary" />
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="secondary"
            style={{
              width: "150px",
              height: "50px",
            }}
            onClick={() => {
              history.push("/shops/new");
            }}
          >
            + Shop
          </Button>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography variant="h4" className={classes.font}>
            My shops
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            {userShopList}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
