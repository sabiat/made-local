import { Divider, Avatar, Grid } from "@material-ui/core";

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
    width: "1000px",
    height: "240px",
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const theme = useTheme();

  const trimDate = (date) => {
    return date.split("").slice(0, 10).join("");
  };

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
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
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                <p style={{ textAlign: "left" }}>{props.message_text}</p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                  <p style={{ textAlign: "right", marginRight: "30px" }}>
                    {trimDate(props.created_at)}
                  </p>
                </p>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
