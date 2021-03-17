import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import Card from "./Card";

import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Home(props) {
  const [category, setCategory] = useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

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
