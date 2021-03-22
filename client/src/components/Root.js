import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid"
import whitelogo2 from "../styles/whitelogo2.png";
import communityphoto4 from "../styles/communityphoto4.png";

const useStyles = makeStyles((theme) => ({
  superMain: {
    backgroundColor: "#f9dbbd",
  },
  main: {
    minHeight: "100vh",
    position: "relative"
  },
  font: {
    color: "#000000",
    fontSize: "1.5em"
  },
  textBox: {
    maxWidth: "28em",
    float: "right",
    textAlign: "right"
  },
  buttons: {
    float: "left",
  },
  footer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
  }
}));

export default function Root() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.superMain}>

      <div className={classes.main}>
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ minHeight: '60vh' }}
          >
            <Grid item xs={5}>
              <Box>
                <Typography variant="h2" justify="flex-end" className={classes.textBox}>
                  <Box className={classes.font}>Welcome to madelocal, your friendly community hub for supporting local home-based businesses.</Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <img
                src={whitelogo2}
                alt="logo"
                style={{ height: "8em" }}
              />
            </Grid>
            <Grid item xs={5} className={classes.buttons}>
              <Grid
                container
                direction="column"
                spacing={2}>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    LOGIN
          </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push("/register");
                    }}
                  >
                    Register
          </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <footer className={`${classes.footer}`}>
          <img
            src={communityphoto4}
            alt="community"
            style={{ maxWidth: "100%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
          />
        </footer>
      </div>
    </div>
  );
}
