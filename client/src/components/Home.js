import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import Card from "./Card";
import axios from "axios";

import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Home(props) {
  const [category, setCategory] = useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [favouritedShops, setFavouritedShops] = useState();

  useEffect(() => {
    axios.get(`/api/users/1/favourites`).then((res) => {
      const usersFavs = [];
      for (const shop of res.data) {
        usersFavs.push(shop.id);
      }
      setFavouritedShops(usersFavs);
    });
  }, []);

  return (
    <div>
      {props.loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <SearchBar category={category} setCategory={handleChange} />
          <Grid container spacing={1}>
            {props.shop
              .filter((shop) => {
                return (
                  category === "" || shop["category_id"] === parseInt(category)
                );
              })
              .map((shop) => {
                if (favouritedShops.includes(shop.id)) {
                  shop.isFavourited = true;
                } else {
                  shop.isFavourited = false;
                }
                console.log(shop);
                return shop;
              })

              .map((shop) => (
                <Grid item style={{ padding: 30 }} xs={4} spacing={3}>
                  <Card key={shop.id} {...shop} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </div>
  );
}
