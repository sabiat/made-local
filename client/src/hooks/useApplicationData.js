// custom hook to pass shopList to App.js -> UserProfile.js and Home.js
// export default everything... 
import { useEffect, useState } from "react";
import axios from "axios";
import haversine from "haversine-distance";

export default function useApplicationData() {

  const [loading, setLoading] = useState(true);
  const [shops, setShops] = useState([]);
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
        setShops(shopList);
      }
    );
  }, []);

  return { loading, setLoading, shop, setShop, shops, setShops, userLocation, setUserLocation }
}