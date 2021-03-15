import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import Card from "./Card";

import { useEffect, useState } from "react";
import axios from "axios";
import haversine from "haversine-distance";

export default function Home() {
  const [shop, setShop] = useState([]);
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });

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
    getLocation().then((coords) => {
      axios
        .get("/api/shops")
        .then((res) => {
          const shopList = res.data.map((item) => {
            const a = { latitude: coords.lat, longitude: coords.lng };
            const b = { latitude: item.latitude, longitude: item.longitude };
            item.distance = (haversine(a, b) / 1000).toFixed(1);
            return item;
          });
          const filteredList = shopList.filter((shop) => {
            return shop.distance < 20;
          });
          setShop(filteredList);
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <div>
      <SearchBar />
      {shop.map((shop) => (
        <Card key={shop.id} {...shop} />
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
