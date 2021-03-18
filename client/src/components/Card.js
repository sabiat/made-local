import { React, useEffect, useState } from "react";
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

import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import axios from "axios";

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
  header: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function ShopCard(props) {
  const classes = useStyles();

  const [favourite, setFavourite] = useState();
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

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title={props.name}
        subheader={`${props.distance} km away`}
      />

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
        <div>
          <IconButton aria-label="add to favorites">
            {favourite ? (
              <FavoriteIcon
                color="secondary"
                onClick={() => setFavourite(false)}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                color="primary"
                onClick={() => {
                  addToFavourites();
                }}
              />
            )}
          </IconButton>
          {props.pickup && (
            <IconButton>
              <CheckCircleOutlineRoundedIcon />
              <Typography variant="body2" color="textSecondary" component="p">
                pick-up
              </Typography>
            </IconButton>
          )}{" "}
          {props.delivery && (
            <IconButton>
              <CheckCircleOutlineRoundedIcon />
              <Typography variant="body2" color="textSecondary" component="p">
                delivery
              </Typography>
            </IconButton>
          )}{" "}
          {props.shipping && (
            <IconButton>
              <CheckCircleOutlineRoundedIcon />
              <Typography variant="body2" color="textSecondary" component="p">
                shipping
              </Typography>
            </IconButton>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
