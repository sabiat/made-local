import Review from "./Review";
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, Grid, TextField } from "@material-ui/core";

export default function ShopMessageBoard(props) {
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

    const message_text = event.target.value;
    const user_id = props.user.id;

    if (event.key === "Enter") {
      axios
        .post(`/api/shops/${shop_id}/messages`, {
          shop_id,
          user_id,
          message_text,
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(event.target.value);
  };

  return (
    <Grid>
      <Typography variant="h6">Community Message Board</Typography>
      {messages.map((message) => (
        <Review key={message.id} {...message}></Review>
      ))}

      <form>
        <TextField
          onKeyDown={(event) => updateMessageBoard(event)}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        ></TextField>
      </form>
    </Grid>
  );
}
