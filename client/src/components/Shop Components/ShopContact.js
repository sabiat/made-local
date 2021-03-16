import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ShopContact(props) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
        <Grid item xs={1}>
        <img
          width="50px"
          src="https://images.pexels.com/photos/4916562/pexels-photo-4916562.jpeg?cs=srgb&dl=pexels-maria-orlova-4916562.jpg&fm=jpg"
          alt=""
          //borderRadius="30px"
        /> 
        </Grid>
      <Grid item xs={4} justify="left">
        <h1>{props.name}</h1>
        <h3>{props.description}</h3>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={4}>
      <Grid container spacing={3} alignItems="center" direction="column">
      <Grid item>
        <Typography className={classes.pos} color="textSecondary">
          Contact
        </Typography>
        <Typography variant="body2">
          @cupcakeQueen
        </Typography>
        <Typography variant="body2">
          {props.phoneNumber}
        </Typography>
        </Grid>
        <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => alert('clicked!')}>
          Chat
        </Button>
        </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}