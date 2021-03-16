import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import Card from "./Card";

import { useEffect, useState } from "react";
import axios from "axios";
import haversine from "haversine-distance";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Home() {
  const [shop, setShop] = useState([]);
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const getLocation = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        res({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    });
  };

  useEffect(() => {
    Promise.all([getLocation(), axios.get("/api/shops")]).then(
      ([coords, shopsResp]) => {
        const shopList = shopsResp.data.map((item) => {
          const a = { latitude: coords.lat, longitude: coords.lng };
          const b = { latitude: item.latitude, longitude: item.longitude };
          item.distance = (haversine(a, b) / 1000).toFixed(1);
          return item;
        });
        const filteredList = shopList.filter((shop) => {
          return shop.distance < 20;
        });
        setShop(filteredList);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <SearchBar category={category} setCategory={handleChange} />
          <Grid container spacing={1}>
            {shop
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
