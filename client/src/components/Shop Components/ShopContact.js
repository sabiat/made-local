import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ShopContact(props) {
  const classes = useStyles();
  console.log(props);

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={7}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h4">
              <h1>{props.name}</h1>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups. Lorem ipsum is placeholder text commonly used in the
              graphic, print, and publishing industries for previewing layouts
              and visual mockups.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Box border={1}>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justify="space-evenly"
            direction="column"
          >
            <Grid item xs={5}>
              <Avatar width="100px" src={props.photo} alt="" />
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                Contact
              </Typography>
              <Typography variant="body2">{props.social}</Typography>
              <Typography variant="body2">{props.phoneNumber}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary">
                <Link
                  to={{
                    pathname: "/chat",
                    state: [props.id, props.name], // your data array of objects
                  }}
                >
                  Chat
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
