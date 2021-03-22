import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Grid from "@material-ui/core/Grid";

import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import axios from "axios";
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
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
  header: {
    backgroundColor: "#f9dbbd",
    maxHeight: "50%",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: theme.palette.warning.main,
  },

  card: {
    borderRadius: 12,
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    color: "#000000",
  },
  symbols: {
    display: "flex",
    justifyContent: "center",
    padding: "0.5px",
  },
  symbol: {
    fontWeight: "600",
    color: "#6C9998",
  },
}));

export default function ShopCard(props) {
  const classes = useStyles();
  const [favourite, setFavourite] = useState();
  const history = useHistory();

  useEffect(() => {
    setFavourite(props.isFavourited);
  }, [props.isFavourited]);

  const addToFavourites = () => {
    axios({
      method: "post",
      url: `/api/users/${props.user.id}/favourites`,
      data: {
        user_id: props.user.id,
        shop_id: props.id,
      },
    }).then((res) => {
      setFavourite(true);
    });
  };

  const removeFromFavourites = () => {
    axios({
      method: "delete",
      url: `/api/users/${props.user.id}/favourites`,
      data: {
        user_id: props.user.id,
        shop_id: props.id,
      },
    }).then((res) => {
      setFavourite(false);
    });
  };

  return (
    <Card className={classes.card}>
      <Grid container className={classes.header}>
        <Grid item>
          <CardHeader
            title={props.name}
            subheader={`${props.distance} km away`}
          />
        </Grid>
        <Grid item style={{ position: "absolute", paddingLeft: "15em" }}>
          <IconButton aria-label="add to favorites">
            {favourite ? (
              <FavoriteIcon
                color="secondary"
                onClick={() => removeFromFavourites()}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                color="secondary"
                onClick={() => {
                  addToFavourites();
                }}
              />
            )}
          </IconButton>
        </Grid>
      </Grid>
      <CardActionArea>
        <CardMedia
          onClick={() => history.push(`/shops/${props.id}`)}
          className={classes.media}
          image={props.photo}
          title={props.name}
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          Delicious gluten free baked goods prepared daily. We also have a ton
          of vegan options to choose from! Contact us today to order!
          {/* {props.description} */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.symbols}>
        <div>
          {props.pickup && (
            <IconButton>
              <CheckCircleOutlineRoundedIcon color="primary" />
              <Typography
                variant="body2"
                component="p"
                className={classes.symbol}
              >
                pick-up
              </Typography>
            </IconButton>
          )}{" "}
          {props.delivery && (
            <IconButton>
              <CheckCircleOutlineRoundedIcon color="primary" />
              <Typography
                variant="body2"
                component="p"
                className={classes.symbol}
              >
                delivery
              </Typography>
            </IconButton>
          )}{" "}
          {props.shipping && (
            <IconButton>
              <CheckCircleOutlineRoundedIcon color="primary" />
              <Typography
                variant="body2"
                component="p"
                className={classes.symbol}
              >
                shipping
              </Typography>
            </IconButton>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
