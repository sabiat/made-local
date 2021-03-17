import Review from "./Review";
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function ShopMessageBoard() {
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

  const handleSubmit = (message) => {
    axios.post("");
    setMessages((messages) => messages.concat([message]));
  };

  return (
    <Grid>
      <Typography variant="h6">Community Message Board</Typography>
      {messages.map((message) => (
        <Review key={message.id} {...message}></Review>
      ))}
      {/* <form onSubmit={}> input="message"</form> */}
    </Grid>
  );
}
