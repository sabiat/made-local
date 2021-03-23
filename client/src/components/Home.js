import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import DistanceFilter from "./DistanceFilter";
import Card from "./Card";
import axios from "axios";
import Chip from "@material-ui/core/Chip";

import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import madelocallogo7 from "../styles/madelocallogo7.png";

export default function Home(props) {
  const [category, setCategory] = useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [distance, setDistance] = useState(10);

  const [favouritedShops, setFavouritedShops] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/favourites`).then((res) => {
      if (res.data.name !== "error") {
        const usersFavs = [];
        for (const shop of res.data) {
          usersFavs.push(shop.shop_id);
        }
        setFavouritedShops(usersFavs);
      } else {
        setFavouritedShops(null);
      }
    });
  }, []);

  return (
    <div style={{ padding: "3rem 8rem 2rem 8rem" }}>
      {props.loading ? (
        <div
          style={{
            padding: "20em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <CircularProgress color="secondary" size="5em" />
          </div>
          <div>
            <img
              src={madelocallogo7}
              alt="logo"
              style={{ height: "2.5em", paddingTop: "10px" }}
            />
          </div>
          <div style={{ padding: "1em" }}>
            <Typography variant="body1">
              Finding shops in your area...
            </Typography>
          </div>
        </div>
      ) : (
        <>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={6}>
              <Typography
                variant="h1"
                style={{
                  color: "#84a59D",
                  fontWeight: "bold",
                  fontSize: "30px",
                  float: "left",
                  paddingLeft: "32px",
                }}
              >
                Discover shops in your area:
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <Grid container direction="column">
                <DistanceFilter distance={distance} setDistance={setDistance} />
                <SearchBar category={category} setCategory={handleChange} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {props.shop
              .filter((shop) => {
                return distance === "" || shop["distance"] < parseInt(distance);
              })
              .filter((shop) => {
                return (
                  category === "" || shop["category_id"] === parseInt(category)
                );
              })
              .map((shop) => {
                if (favouritedShops && favouritedShops.includes(shop.id)) {
                  shop.isFavourited = true;
                } else {
                  shop.isFavourited = false;
                }
                return shop;
              })

              .map((shop) => (
                <Grid
                  key={shop.id}
                  item
                  style={{ padding: 30 }}
                  xs={4}
                  spacing={1}
                >
                  <Card key={shop.id} {...shop} user={props.user} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </div>
  );
}
