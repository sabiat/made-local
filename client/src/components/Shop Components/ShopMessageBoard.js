import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function ShopMessageBoard() {
  return (
    <div>
      <Typography>Community Message Board
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Dude Bro</h4>
            <p style={{ textAlign: "left" }}>
              This is a great shop!{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Bro Dude</h4>
            <p style={{ textAlign: "left" }}>
              Highly recommend the cupcakes.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 3 minutes ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      </Typography>
    </div>
  );
}
