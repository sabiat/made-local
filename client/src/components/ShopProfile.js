import ShopContact from "./Shop Components/ShopContact";
import ShopMap from "./Shop Components/ShopMap";
import ShopPhotos from "./Shop Components/ShopPhotos";
import ShopMessageBoard from "./Shop Components/ShopMessageBoard";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

export default function ShopProfile(props) {
  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState({
    shop: [],
  });

  const history = useHistory();

  const fetchshopDetails = () => {
    const endpoint = window.location.pathname.split("/");
    const id = endpoint[endpoint.length - 1];
    axios.get(`/api/shops/${id}`).then((res) => {
      setState((prev) => ({ ...prev, shop: res.data }));
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchshopDetails();
  }, []);

  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <div>
      {/* {isLoading ? (
        <div className="App">Loading...</div>
      ) : ( */}
      <ShopContact
        name={state.shop[0].name}
        id={state.shop[0].id}
        description={state.shop[0].description}
        photo={state.shop[0].photo}
        phoneNumber={state.shop[0].phone_number}
        social={state.shop[0].social}
        delivery={state.shop[0].delivery}
        pickup={state.shop[0].pickup}
        shipping={state.shop[0].shipping}
      />
      {/* )} */}
      <Grid container alignItems="center">
        <Grid item xs={8}>
          {state.shop[0].user_id === props.user.id && (
            <AddAPhotoIcon
              onClick={() =>
                history.push(`/shops/${state.shop[0].id}/addphoto`)
              }
            />
          )}
          <ShopPhotos />
        </Grid>

        {/* {isLoading ? (
          <div className="App">Loading...</div>
        ) : ( */}
        <Grid item xs={4}>
          <ShopMap
            name={state.shop[0].name}
            lat={state.shop[0].latitude}
            lon={state.shop[0].longitude}
          />
        </Grid>
        {/* )} */}
      </Grid>
      <Grid item xs={12}>
        <ShopMessageBoard user={props.user} />
      </Grid>
    </div>
  );
}
