import { React, useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

export default function Login() {
  const history = useHistory();
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const sendUserInfo = () => {
    if (userInfo.length && userInfo.password.length) {
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    history.push("/home");
  };
  return (
    <Container className={classes.container} maxWidth="xs">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  size="small"
                  type="password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
