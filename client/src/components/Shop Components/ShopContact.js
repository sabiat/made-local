import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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
    <Grid container alignItems="center">
      <Grid item xs={5} justify="left">
        <Typography variant="body1">
          <h1>{props.name}</h1>
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body2" color="textSecondary">
          {props.description}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={3} alignItems="center" direction="column">
          <Grid item>
            <Avatar width="100px" src={props.photo} alt="" />
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              Contact
            </Typography>
            <Typography variant="body2">@cupcakeQueen</Typography>
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
      </Grid>
    </Grid>
  );
}
