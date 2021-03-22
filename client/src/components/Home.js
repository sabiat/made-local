import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import DistanceFilter from "./DistanceFilter";
import Card from "./Card";
import axios from "axios";

import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import madelocallogo7 from "../styles/madelocallogo7.png";

export default function Home(props) {
  const [category, setCategory] = useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [distance, setDistance] = useState(30);
  // console.log("distance", distance)
  // const handleDistanceChange = (value) => {
  //   setDistance(value);
  // };

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
    <div>
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
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <SearchBar category={category} setCategory={handleChange} />
            <DistanceFilter distance={distance} setDistance={setDistance} />
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
                  spacing={3}
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
