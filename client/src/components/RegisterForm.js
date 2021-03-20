import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegistrationForm(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const sendDetailsToServer = () => {
    if (
      state.username.length &&
      state.firstName.length &&
      state.lastName.length &&
      state.email.length &&
      state.photo.length &&
      state.password.length &&
      state.confirmPassword.length
    ) {
      axios({
        method: "post",
        url: "/api/users/register",
        data: {
          username: state.username,
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          photo: state.photo,
          password: state.password,
          confirmPassword: state.confirmPassword,
        },
      })
        .then(function (response) {
          if (response.status === 200) {
            const loggedInUser = {
              id: response.data.id,
              email: response.data.email,
              user_name: response.data.user_name,
            };
            props.setAppUser(loggedInUser);
            history.push("/home");
          } else {
            console.log("error");
            //props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Please fill-in all fields");
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                // name="firstName"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User name"
                autoFocus
                //
                type="name"
                id="username"
                placeholder="Username"
                value={state.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                //
                type="name"
                id="firstName"
                placeholder="First Name"
                value={state.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                //
                type="name"
                id="lastName"
                placeholder="Last Name"
                value={state.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                //
                type="email"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={state.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="photo"
                label="Picture"
                id="photo"
                autoComplete="photo"
                //
                type="photo"
                id="photo"
                placeholder="Picture"
                value={state.photo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                //
                type="password"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                autoComplete="current-password"
                //

                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={state.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
            onClick={handleSubmitClick}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                onClick={() => {
                  history.push("/login");
                }}
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
