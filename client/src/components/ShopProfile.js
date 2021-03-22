import ShopMap from "./Shop Components/ShopMap";
import ShopPhotos from "./Shop Components/ShopPhotos";
import ShopMessageBoard from "./Shop Components/ShopMessageBoard";
import Typography from "@material-ui/core/Typography";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CircularProgress from "@material-ui/core/CircularProgress";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
      {/* main container top is all info, bottom is msg board */}
      <Box mx="auto" bgcolor="background.paper" p={5}>
        {/* MAIN CONTAINER */}
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={4}
        >
          <Grid item>
            {/* NAME AND PHOTOS ONE SIDE AND CONTACT OTHER SIDE */}
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {/* NAME AND PHOTOS */}
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Grid item>
                    <Typography variant="h1" style={{ marginTop: "-25px" }}>
                      <h1>{state.shop[0].name}</h1>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <ShopPhotos />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                {/* CONTACT, DESC, MAP */}
                <Grid
                  container
                  direction="column"
                  spacing={5}
                  style={{ marginTop: "-37px" }}
                >
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ marginTop: "2rem" }}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        style={{
                          maxWidth: "500px",
                          maxHeight: "100px",
                          minWidth: "70px",
                          minHeight: "70px",
                        }}
                      >
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                          to={{
                            pathname: "/chat",
                            state: [state.shop[0].id, state.shop[0].name],
                          }}
                        >
                          Chat with this shop
                        </Link>
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid item style={{ paddingTop: "37px" }}>
                    <ShopMap
                      name={state.shop[0].name}
                      lat={state.shop[0].latitude}
                      lon={state.shop[0].longitude}
                    />
                  </Grid>
                  <Grid container direction="row" justify="center" spacing={4}>
                    <Grid item>
                      <Avatar
                        width="200px"
                        style={{ height: "70px", width: "70px" }}
                        sizes="large"
                        src={state.shop[0].photo}
                        alt=""
                      />
                    </Grid>
                    <Grid item>
                      <Grid item>
                        <Typography variant="h4" color="textSecondary">
                          Contact
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5">
                          {state.shop[0].social}
                        </Typography>
                      </Grid>
                      <Typography variant="h5">
                        {state.shop[0].phone_number}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {state.shop[0].user_id === props.user.id && (
                        <Box>
                          <AddAPhotoIcon
                            onClick={() =>
                              history.push(
                                `/shops/${state.shop[0].id}/addphoto`
                              )
                            }
                          />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary">
                      {state.shop[0].description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* MESSAGE BOARD */}
          <Grid item xs={10}>
            <ShopMessageBoard user={props.user} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
