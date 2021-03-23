import { Divider, Avatar, Grid } from "@material-ui/core";

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    width: "700px",
    height: "10vw",
    borderRadius: "10px",
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const theme = useTheme();

  const trimDate = (date) => {
    return date.split("").slice(0, 10).join("");
  };

  console.log(props);

  return (
    // <Card className={classes.root}>
    <div className={classes.details}>
      <Box
        border={2}
        style={{
          borderRadius: "10px",
          margin: "0.5vw",
          borderColor: "#84A59D",
          backgroundColor: "#FAF9F9",
        }}
      >
        <CardContent className={classes.content}>
          <Typography variant="h5">
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt={props.user_name} src={props.photo} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {props.user_name}
                </h4>

                <p style={{ textAlign: "left" }}>{props.message_text}</p>
                <p
                  style={{
                    textAlign: "right",
                    marginRight: "30px",
                    color: "grey",
                  }}
                >
                  {trimDate(props.created_at)}
                </p>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </Box>
    </div>
    // </Card>
  );
}
