import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(
      "https://images.pexels.com/photos/6097827/pexels-photo-6097827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      )`,
    height: "350px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Root() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.image}>
        <Typography variant="h2">
          <Box>MADE LOCAL</Box>
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push("/login");
        }}
      >
        Login
      </Button>{" "}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push("/register");
        }}
      >
        Register
      </Button>
    </div>
  );
}
