import { React, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function ShopPhotos() {
  const classes = useStyles();

  const [photosLoading, setPhotosLoading] = useState(true);
  const [photos, setPhotos] = useState();

  const endpoint = window.location.pathname.split("/");
  const id = endpoint[endpoint.length - 1];

  const fetchShopPhotos = () => {
    axios.get(`/api/shops/${id}/photos`).then((res) => {
      setPhotos(res.data);
      setPhotosLoading(false);
    });
  };

  useEffect(() => {
    fetchShopPhotos();
  }, []);

  return (
    <div className={classes.root}>
      {photosLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Grid container spacing={1}>
          {photos.map((photo) => (
            <Grid item xs={4} key={photo.id} spacing={1}>
              <div
              // style={{
              //   margin: "10px",
              // }}
              >
                <img
                  src={photo.photo_urls}
                  style={{
                    width: "18em",
                    height: "18em",
                    objectFit: "cover",
                    maxWidth: "100%",
                  }}
                  alt=""
                />
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
