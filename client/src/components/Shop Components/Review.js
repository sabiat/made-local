import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
    width: "500px",
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
          <Typography variant="body2">
            <Paper style={{ padding: "5px 5px" }}>
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
            </Paper>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

{
  /* <Typography variant="body2">
  <Paper style={{ padding: "40px 20px" }}>
    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar alt={props.user_name} src={props.photo} />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: "left" }}>{props.user_name}</h4>
        <p style={{ textAlign: "left" }}>{props.message_text}</p>
        <p style={{ textAlign: "left", color: "gray" }}>
          {trimDate(props.created_at)}
        </p>
      </Grid>
    </Grid>
  </Paper>
</Typography>
); */
}
