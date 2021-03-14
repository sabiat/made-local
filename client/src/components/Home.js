import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ShopBadge from "./ShopBadge";
import SearchBar from "./SearchBar";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [state, setState] = useState("");

  const fetchShopData = () => {
    axios
      .get("/api/shops")
      .then((res) => {
        const shop = res.data;
        setState({ shop });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  return (
    <div>
      <SearchBar />
      <Grid container direction="row" justify="center" alignItems="center">
        <ShopBadge />
        <ShopBadge />
        <ShopBadge />
        <ShopBadge />
        <ShopBadge />
        <ShopBadge />
        <ShopBadge />
        <ShopBadge />
      </Grid>
    </div>
  );
}
