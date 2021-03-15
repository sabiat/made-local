import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ShopBadge from "./ShopBadge";
import SearchBar from "./SearchBar";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [state, setState] = useState();

  useEffect(() => {
    axios
      .get("/api/shops")
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("this is the state: ", state);
  return (
    <div>
      <SearchBar />
      <Grid container direction="row" justify="center" alignItems="center">
        <ShopBadge
          shopName={state}
          // shopName={state.name}
        />
      </Grid>
    </div>
  );
}
