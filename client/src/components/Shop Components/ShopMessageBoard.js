import Review from "./Review";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Container,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flex: "1 0 auto",
    width: "500px",
    height: "240px",
  },
}));

export default function ShopMessageBoard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [messages, setMessages] = useState([]);

  const fetchShopReviews = () => {
    const endpoint = window.location.pathname.split("/");
    const id = endpoint[endpoint.length - 1];

    axios.get(`/api/shops/${id}/messages`).then((res) => {
      setMessages(res.data);
    });
  };

  useEffect(() => {
    fetchShopReviews();
  }, []);

  const updateMessageBoard = (event) => {
    const endpoint = window.location.pathname.split("/");
    const shop_id = endpoint[endpoint.length - 1];

    event.preventDefault();

    const message_text = event.target.messageForm.value;
    const user_id = props.user.id;

    axios
      .post(`/api/shops/${shop_id}/messages`, {
        shop_id,
        user_id,
        message_text,
      })
      .then(fetchShopReviews())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <Grid container className={classes.content}>
    <div>
      {/* <Grid item> */}
      <Typography variant="h3">Community Message Board</Typography>
      {messages.map((message) => (
        <Review key={message.id} {...message}></Review>
      ))}

      <form onSubmit={updateMessageBoard}>
        <TextField
          // onKeyDown={(event) => updateMessageBoard(event)}
          id="outlined-basic"
          label="Add Review"
          variant="outlined"
          name="messageForm"
        ></TextField>
        <Button type="submit">send me</Button>
      </form>
      {/* </Grid> */}
    </div>
    // </Grid>
  );
}
