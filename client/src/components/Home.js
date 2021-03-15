import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import Card from "./Card";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [shop, setShop] = useState([]);

  useEffect(() => {
    axios
      .get("/api/shops")
      .then((res) => {
        setShop(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("this is the state: ", shop);
  return (
    <div>
      <SearchBar />
      {shop.map((shop) => (
        <Card
          name={shop.name}
          description={shop.description}
          delivery={shop.delivery}
          pickup={shop.pickup}
          shipping={shop.shipping}
          photo={shop.photo}
        />
      ))}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      ></Grid>
    </div>
  );
}
