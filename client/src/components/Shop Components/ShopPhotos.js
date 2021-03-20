import { React, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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
        <Grid container spacing={3}>
          {photos.map((photo) => (
            <Grid item xs={4} key={photo.id}>
              <Paper className={classes.paper}>
                <img width="80%" src={photo.photo_urls} alt="" />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
