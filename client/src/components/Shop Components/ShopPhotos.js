import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ShopPhotos() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}><img
        width="100px"
        src="https://images.pexels.com/photos/4916562/pexels-photo-4916562.jpeg?cs=srgb&dl=pexels-maria-orlova-4916562.jpg&fm=jpg"
        alt=""
      /></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><img
        width="100px"
        src="https://images.pexels.com/photos/4916562/pexels-photo-4916562.jpeg?cs=srgb&dl=pexels-maria-orlova-4916562.jpg&fm=jpg"
        alt=""
      /></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><img
        width="100px"
        src="https://images.pexels.com/photos/4916562/pexels-photo-4916562.jpeg?cs=srgb&dl=pexels-maria-orlova-4916562.jpg&fm=jpg"
        alt=""
      /></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><img
        width="100px"
        src="https://images.pexels.com/photos/4916562/pexels-photo-4916562.jpeg?cs=srgb&dl=pexels-maria-orlova-4916562.jpg&fm=jpg"
        alt=""
      /></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><img
        width="100px"
        src="https://images.pexels.com/photos/4916562/pexels-photo-4916562.jpeg?cs=srgb&dl=pexels-maria-orlova-4916562.jpg&fm=jpg"
        alt=""
      /></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><img
        width="100px"
        src="https://images.pexels.com/photos/4916562/pexels-photo-4916562.jpeg?cs=srgb&dl=pexels-maria-orlova-4916562.jpg&fm=jpg"
        alt=""
      /></Paper>
        </Grid>
      </Grid>
    </div>
  );
}