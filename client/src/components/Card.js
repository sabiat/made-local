import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";

import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ShopCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={props.name} subheader={`${props.distance} km away`}  />

      <CardMedia
        className={classes.media}
        image={props.photo}
        title={props.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {props.pickup && (
          <IconButton>
            <CheckCircleOutlineRoundedIcon /> pick-up
          </IconButton>
        )}{" "}
        {props.delivery && (
          <IconButton>
            <CheckCircleOutlineRoundedIcon /> delivery
          </IconButton>
        )}{" "}
        {props.shipping && (
          <IconButton>
            <CheckCircleOutlineRoundedIcon /> shipping
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
