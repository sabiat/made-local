import { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
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

export default function AddPhoto() {
  const [photoUrl, setPhotoUrl] = useState("");

  const history = useHistory();
  const classes = useStyles();

  const handleChange = (e) => {
    const value = e.target.value;
    setPhotoUrl(value);
  };

  const endpoint = window.location.pathname.split("/");
  const id = endpoint[2];

  const addPhoto = () => {
    if (photoUrl.length) {
      axios({
        method: "post",
        url: "/api/shops/addphoto",
        data: {
          photoUrl: photoUrl,
          shopId: id,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            history.push(`/shops/${id}`);
          } else {
            console.log("error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPhoto();
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: "50vh" }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            label="New photo"
            name="photo URL"
            value={photoUrl}
            onChange={handleChange}
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            color="secondary"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Add photo
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
