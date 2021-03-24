import Review from "./Review";
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import whitelogo2 from "../../styles/whitelogo2.png";

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

    event.target.messageForm.value = "";

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
    <div>
      <Grid container direction="column" spacing={3}>
        <Box
          border={2}
          style={{
            backgroundColor: "#6C9998",
            borderColor: "#6C9998",
            paddingTop: "25px",
            borderRadius: "10px",
          }}
        >
          <Grid item style={{ backgroundColor: "#6C9998" }}>
            <Typography variant="h1" style={{ color: "white" }}>
              Community Hub
            </Typography>
          </Grid>
          <Grid item>
            <img src={whitelogo2} style={{ width: "35px" }} />
          </Grid>
          <Grid item>
            {messages.map((message) => (
              <Review key={message.id} {...message}></Review>
            ))}
          </Grid>
        </Box>

        <Grid item>
          <form onSubmit={updateMessageBoard}>
            <TextField
              // onKeyDown={(event) => updateMessageBoard(event)}
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Add Comment"
              variant="outlined"
              name="messageForm"
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Share
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
