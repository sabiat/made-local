import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ShopBadge from "./ShopBadge";
import SearchBar from "./SearchBar";

export default function Home() {
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
